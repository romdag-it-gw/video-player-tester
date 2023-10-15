import { PLAYER_EVENTS } from './enums';
import { isGetUserMediaCalled, setGetUserMediaCalled } from './lock';
import { PeerConnection, SessionDescription, IceCandidate } from './adapters';
import WebRTCBase from "./base";

const SAFARI_PERMISSIONS_REQUEST_MESSAGE =
  'We need to get access to one of media devices to start playing stream over WebRTC in Safari (or any IOS browser). If press YES, browser will ask you for permission.';

export default class Player extends WebRTCBase {
  /**
   * @param {HTMLMediaElement} media
   * @param {string} url
   * @param {object} opts
   * @param {boolean} opts.autoplay
   * @param {number} opts.retryMax - number of ws connection retries
   * @param {number} opts.retryDelay - number of connection retries
   * @param {boolean} shouldLog
   */
  constructor(media, url, opts = {}, shouldLog = false) {
    super(url, opts, shouldLog);

    if (!(media instanceof HTMLMediaElement)) {
      throw 'First argument must be html5 video tag';
    }

    this.remoteVideo = media;

    this.remoteVideo.addEventListener('play', this.onVideoPlay);

    if (opts.autoplay) {
      this.play();
    }
  }

  onDestroy = () => {
    this.stop();
    this.remoteVideo.removeEventListener('play', this.onVideoPlay);
  };

  createPeerConnection = () => {
    this.log('Player::createPeerConnection');

    this.remotePc = new PeerConnection(null);
    // {iceServers: [], bundlePolicy: "max-compat"}, [{"DtlsSrtpKeyAgreement": true}]
    this.remotePc.stream_id = 'remote1';
    this.remotePc.onicecandidate = this.gotIceCandidate;
    this.remotePc.ontrack = this.gotRemoteTrack;
    this.remotePc.onconnectionstatechange = evt => {
      this.log('peer connection state:', this.remotePc.connectionState);
      if (this.remotePc.connectionState === 'closed') {
        this.stop();
        this.notify(PLAYER_EVENTS.FAIL, 'peer_connection_closed');
      } else if (this.remotePc.connectionState === 'failed') {
        this.stopRetry(this.play);
      }
    };

    // Logging
    this.remotePc.oniceconnectionstatechange = evt => {
      this.log('icechange:', evt);
      if (this.remotePc.iceConnectionState === 'failed') {
        this.stopRetry(this.play);
        this.notify(PLAYER_EVENTS.FAIL, 'ice_connection_fail');
      }
      if (this.remotePc.iceConnectionState === 'closed') {
        this.stop();
        this.notify(PLAYER_EVENTS.FAIL, 'ice_connection_closed');
      }
      this.notify(PLAYER_EVENTS.DEBUG, [
        'ICE connection state',
        this.remotePc.iceConnectionState,
      ]);
    };

    this.remotePc.onicegatheringstatechange = evt => {
      this.log('ice gathering state', this.remotePc.iceGatheringState, evt);
    };
    this.remotePc.onsignalingstatechange = evt => {
      this.log('signaling state', this.remotePc.signalingState, evt);
    };
  };

  checkGetUserMediaCall = () => {
    if (this.isSafariOrIOS && !isGetUserMediaCalled()) {
      if (confirm(SAFARI_PERMISSIONS_REQUEST_MESSAGE)) {
        setGetUserMediaCalled();
        const constraints = { audio: true, video: true };
        return navigator.mediaDevices.getUserMedia(constraints);
      } else {
        return Promise.reject();
      }
    } else {
      return Promise.resolve();
    }
  };

  play = () => {
    this.log('Player::play');
    this.checkGetUserMediaCall().then(() => {
      let wsUrl = new URL(this.url);
      wsUrl.pathname = wsUrl.pathname + '/webrtc';
      wsUrl.protocol = /https/.test(wsUrl.protocol) ? 'wss' : 'ws';

      this.ws = new WebSocket(wsUrl.toString());

      this.ws.onopen = evt => {
        this.createPeerConnection();
      };

      this.ws.onerror = evt => {
        this.stopRetry(this.play);
        this.notify(PLAYER_EVENTS.FAIL, 'ws_error', evt);
      };

      this.ws.onclose = evt => {
        this.stop();
        this.notify(PLAYER_EVENTS.FAIL, 'ws_closed');
      };

      this.ws.onmessage = this.onWsMsg;
    });
  };

  stop = () => {
    this.retryCounterReset();

    if (this.ws) {
      this.ws.close();
      delete this.ws;
    }

    try {
      this.remoteVideo.srcObject = null;
    } catch (err) {
      this.remoteVideo.src = null;
    }
  };

  gotIceCandidate = event => {
    this.log('ice candidate:', event);
    if (event.candidate) {
      this.sendWsMsg({
        type: 'candidate',
        stream_id: 'local1',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate,
      });
    }
  };

  gotRemoteTrack = e => {
    this.log('remote track', e);
    if (e.track.kind === 'video' || e.track.kind === 'audio') {
      try {
        this.remoteVideo.srcObject = e.streams[0];
      } catch (error) {
        this.remoteVideo.src = window.URL.createObjectURL(e.streams[0]);
      }
    }
  };

  getSessionDescription = ({ sdp, ...message }) =>
    new SessionDescription({
      ...message,
      // I'm really shamed, but I experimented and hadn't find any other reason
      // for not playing video, so SODD helps me =)
      // https://stackoverflow.com/questions/47990094/failed-to-set-remote-video-description-send-parameters-on-native-ios
      sdp: sdp.replace(
        /profile-level-id=(\d|A|B|C|D|E|F)+;/,
        'profile-level-id=42E01F;',
      ),
    });

  onWsMsg = evt => {
    this.log('ws message received');
    const message = JSON.parse(evt.data);

    if (message.type === 'offer') {
      this.onWsOfferReceived(message);
    } else if (message.type === 'candidate') {
      this.onWsIceCandidateReceived(message);
    }
  };

  remoteCreateAnswer = () => {
    this.log('success adding offer');
    // Теперь просим PeerConnection сделать ответ для флюссоника
    return this.remotePc.createAnswer();
  };

  remoteSetLocalDescription = answer => {
    this.log('now have answer', answer.sdp);
    // Получили ответ от PeerConnection и помечаем его как local
    // description
    return this.remotePc.setLocalDescription(answer);
  };

  remoteSendLocalDescription = () => {
    this.log('now have local desc', this.remotePc.localDescription.sdp);
    // после этого можно слать local description как ответ флюссонику
    // дальше будет обмен кандидатами
    this.sendWsMsg(this.remotePc.localDescription);
  };

  onDescriptionError = reason => {
    this.notify(PLAYER_EVENTS.DEBUG, ['failed to set remote answer', reason]);
    // stop() caused problems with playback
    // this.stop();
    this.notify(PLAYER_EVENTS.FAIL, 'set_remote_description_failed');
  };

  onWsOfferReceived = message => {
    this.log('ws message type === offer', message);
    // От флюссоника приехал SDP, который засовываем в PeerConnection
    // как remote description
    const desc = this.getSessionDescription(message);
    this.log('session description', desc);
    this.remotePc
      .setRemoteDescription(desc)
      .then(this.remoteCreateAnswer)
      .then(this.remoteSetLocalDescription)
      .then(this.remoteSendLocalDescription)
      .catch(this.onDescriptionError);
  };

  onWsIceCandidateReceived = message => {
    this.log('have candidate');
    const candidate = new IceCandidate(message.candidate);
    this.remotePc.addIceCandidate(
      candidate,
      () => {},
      err => {
        this.notify(PLAYER_EVENTS.DEBUG, [
          'failed to add ICE from remote:',
          err,
        ]);
      },
    );
  };

  onVideoPlay = () => {
    this.notify(PLAYER_EVENTS.PLAY);
  };
}
