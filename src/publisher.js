import { PUBLISHER_EVENTS, PUBLISHER_STATUSES } from './enums';
import { setGetUserMediaCalled } from './lock';
import { PeerConnection, SessionDescription, IceCandidate } from './adapters';
import WebRTCBase from "./base";

export default class Publisher extends WebRTCBase {
  /**
   * Creates new instance of publisher with passed url and options
   * @param {string} streamUrl
   * @param {object} opts
   * @param {object} opts.preview
   * @param {object} opts.previewOptions - it's keys'll be applied to preview dom node as attributes
   * @param {boolean} opts.previewOptions.autoplay
   * @param {boolean} opts.previewOptions.controls
   * @param {boolean} opts.previewOptions.muted
   * @param {object} opts.constraints - video constraints
   * @param {boolean} opts.constraints.audio
   * @param {boolean} opts.constraints.video
   * @param {function} opts.onWebsocketClose
   * @param {boolean} shouldLog
   */
  constructor(streamUrl, opts = {}, shouldLog = false) {
    super(streamUrl, opts, shouldLog);

    const self = this;
    this.status = PUBLISHER_STATUSES.INITIALIZING;

    if (opts.preview) {
      this.videoContainer = opts.preview;
      if (opts.previewOptions) {
        this.videoContainer.autoplay = opts.previewOptions.autoplay;
        this.videoContainer.controls = opts.previewOptions.controls;
        this.videoContainer.muted = opts.previewOptions.muted;
      }
      this.videoContainer.addEventListener('loadedmetadata', function() {
        self.log(
          `Local video videoWidth: ${this.videoWidth}px,  videoHeight: ${
            this.videoHeight
          }px`,
        );
      });
    }
      
      this.externalStream = opts.stream;

    this.onWebsocketClose = opts.onWebsocketClose;
  }

  /**
   * @param {object} opts
   * @param {object} opts.openPeerConnectionOptions
   * @param {object} opts.openPeerConnectionOptions.getMediaOptions
   * @param {function} opts.openPeerConnectionOptions.getMediaOptions.onGetUserMediaError
   */
  start = opts => {
    let url = new URL(this.url);
    url.protocol = /https/.test(url.protocol) ? 'wss' : 'ws';
    url.pathname = url.pathname + '/webrtc/publish';

    this.ws = new WebSocket(url.toString());

    this.ws.onopen = () =>
      this.openPeerConnection(opts ? opts.openPeerConnectionOptions : null);
    this.ws.onmessage = this.onWsMsg;
    this.ws.onclose = event => {
      this.log("WebSocket 'onClose' fired.", event);
      if (typeof this.onWebsocketClose === 'function') {
        this.onWebsocketClose();
      }
    };

    this.ws.onerror = event =>
      this.log("WebSocket 'onError' fired, no handler presented", event);
  };

  stop = () => {
    this.clearLocalStreamSource();

    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.status = PUBLISHER_STATUSES.STOPPED;
  };

  /**
   * @param {object} opts
   * @param {object} opts.getMediaOptions
   * @param {function} opts.getMediaOptions.onGetUserMediaError
   */
  openPeerConnection = opts => {
    if (this.isSafariOrIOS) {
      this.getMedia(opts ? opts.getMediaOptions : null, cb => {
        this.log('openPeerConnection::cb');
        this.peerConnection = new PeerConnection(null);
        this.peerConnection.stream_id = 'local1';
        this.peerConnection.onicecandidate = this.gotIceCandidate;
        this.log('openPeerConnection::peerConnection', this.peerConnection);
        if (typeof cb === 'function') {
          cb();
        }
      });
    } else {
      this.peerConnection = new PeerConnection(null);
      this.peerConnection.stream_id = 'local1';
      this.peerConnection.onicecandidate = this.gotIceCandidate;

      this.getMedia(opts ? opts.getMediaOptions : null);
    }
  };

  clearLocalStreamSource = () => {
    return;

    if (this.stream) {
      this.stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }
  };

  onWsAnswerReceived = message => {
    const description = new SessionDescription(message);
    this.peerConnection.setRemoteDescription(description);
    this.log('answer');
  };

  onWsIceCandidateReceived = message => {
    this.log('candidate');
    const candidate = new IceCandidate(message.candidate);
    this.peerConnection.addIceCandidate(candidate).then(() => {
      this.status = PUBLISHER_STATUSES.STREAMING;
      this.emitter.emit(PUBLISHER_EVENTS.STREAMING);
      this.log('streaming', this.stream);
      if (this.videoContainer) {
        this.videoContainer.srcObject = this.stream;
      }
    });
  };

  onWsMsg = event => {
    const message = JSON.parse(event.data);

    // TODO Remove redundant switch
    if (message.type === 'answer') {
      this.onWsAnswerReceived(message);
    } else if (message.type === 'candidate') {
      this.onWsIceCandidateReceived(message);
    }
  };

  gotIceCandidate = event => {
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

  /**
   * @param {object} opts
   * @param {function} opts.onGetUserMediaError
   * @param {function} [cb]
   */
  getMedia = (opts, cb) => {
    //this.clearLocalStreamSource();
    
    if (typeof cb === 'function') {
        cb(() => {
            this.gotMedia(this.externalStream);
        });
    } else {
        this.gotMedia(this.externalStream);
    }
    return;

    navigator.mediaDevices
      .getUserMedia(this.constraints)
      .then(stream => {
        setGetUserMediaCalled();
        this.log('mediaDevices.getUserMedia success.');
        if (typeof cb === 'function') {
          cb(() => {
            this.log('getMedia::cb');
            this.gotMedia(stream);
          });
        } else {
          this.gotMedia(stream);
        }
      })
      .catch(error => {
        this.log('mediaDevices.getUserMedia exception occured.', error);
        if (opts && opts.onGetUserMediaError) {
          opts.onGetUserMediaError(error);
        }
      });
  };

  gotMedia = stream => {
    this.stream = stream;
    this.log('got', this.stream);
    this.log('gotMedia::peerConnection', this.peerConnection);
    this.stream
      .getTracks()
      .forEach(track => this.peerConnection.addTrack(track, this.stream));

    this.peerConnection
      .createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })
      .then(description => {
        return this.peerConnection.setLocalDescription(description);
      })
      .then(() => {
        this.sendWsMsg(this.peerConnection.localDescription);
      })
      .catch(error => {
        const errorMessage = 'Error establishing P2P connection.';
        this.log(errorMessage, error);
      });
  };

  /**
   *
   * @param {array} args
   * @param {string} args[0] - event name
   * @param {function} args[1] - callback for event
   * @returns {*}
   */
  on = (...args) => {
    return this.emitter.on.apply(this.emitter, args);
  };
}
