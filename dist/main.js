/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/adapters.js":
/*!*************************!*\
  !*** ./src/adapters.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IceCandidate: () => (/* binding */ IceCandidate),
/* harmony export */   PeerConnection: () => (/* binding */ PeerConnection),
/* harmony export */   SessionDescription: () => (/* binding */ SessionDescription)
/* harmony export */ });
var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var IceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.RTCIceCandidate;
var SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.RTCSessionDescription;

/***/ }),

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebRTCBase)
/* harmony export */ });
/* harmony import */ var nanoevents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoevents */ "./node_modules/nanoevents/index.js");
/* harmony import */ var nanoevents__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nanoevents__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loggers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loggers */ "./src/loggers.js");
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bowser */ "./node_modules/bowser/es5.js");
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bowser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nanoevents_unbind_all__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nanoevents/unbind-all */ "./node_modules/nanoevents/unbind-all.js");
/* harmony import */ var nanoevents_unbind_all__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nanoevents_unbind_all__WEBPACK_IMPORTED_MODULE_3__);
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




class WebRTCBase {
  constructor(url) {
    var _this = this;
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var shouldLog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    _defineProperty(this, "destroy", () => {
      nanoevents_unbind_all__WEBPACK_IMPORTED_MODULE_3___default()(this.emitter);
      if (typeof this.onDestroy === 'function') {
        this.onDestroy();
      }
    });
    /**
     * Used to stop only after retries limit exceeded
     * @param {function} cb
     */
    _defineProperty(this, "stopRetry", cb => {
      this.retryCounter -= 1;
      if (this.retryCounter > 0) {
        setTimeout(cb, this.retryDelay);
      } else {
        this.stop();
      }
    });
    /**
     * Do this for all method, that shoul be implemented in descendants
     */
    _defineProperty(this, "stop", this.shouldImplementError('stop'));
    _defineProperty(this, "retryCounterReset", () => {
      this.retryCounter = this.retryMax;
    });
    _defineProperty(this, "sendWsMsg", msg => {
      this.waitForConnection(() => this.ws.send(JSON.stringify(msg)), 20);
    });
    _defineProperty(this, "waitForConnection", (cb, interval) => {
      if (this && this.ws) {
        if (this.ws.readyState === 1) {
          cb();
        } else {
          setTimeout(() => this.waitForConnection(cb, interval), interval);
        }
      }
    });
    /**
     *
     * @param {array} args
     * @param {string} args[0] - event name
     * @param {function} args[1] - callback for event
     * @returns {*}
     */
    _defineProperty(this, "on", function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _this.emitter.on.apply(_this.emitter, args);
    });
    this.url = url;
    this.emitter = new (nanoevents__WEBPACK_IMPORTED_MODULE_0___default())();
    this.notify = this.emitter.emit.bind(this.emitter);
    this.log = shouldLog ? _loggers__WEBPACK_IMPORTED_MODULE_1__.consoleLog : _loggers__WEBPACK_IMPORTED_MODULE_1__.emptyLog;
    this.retryMax = opts.retryMax || 1;
    this.retryDelay = opts.retryDelay || 1000;
    this.retryCounter = this.retryMax;
    this.ws = null;
    var {
      browser,
      os
    } = bowser__WEBPACK_IMPORTED_MODULE_2___default().getParser(window.navigator.userAgent).parsedResult;
    this.isSafariOrIOS = browser.name === 'Safari' || os.name === 'iOS';
  }
  shouldImplementError(name) {
    return () => {
      console.error("Custom ".concat(name, " method should be implemented for WebRTCBase descendants"));
      throw new Error();
    };
  }
}

/***/ }),

/***/ "./src/dev/config.js":
/*!***************************!*\
  !*** ./src/dev/config.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  host: 'demo',
  name: 'clock'
});

/***/ }),

/***/ "./src/enums.js":
/*!**********************!*\
  !*** ./src/enums.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PLAYER_EVENTS: () => (/* binding */ PLAYER_EVENTS),
/* harmony export */   PUBLISHER_EVENTS: () => (/* binding */ PUBLISHER_EVENTS),
/* harmony export */   PUBLISHER_STATUSES: () => (/* binding */ PUBLISHER_STATUSES)
/* harmony export */ });
var PLAYER_EVENTS = {
  FAIL: 'fail',
  PLAY: 'play',
  DEBUG: 'debug'
};
var PUBLISHER_EVENTS = {
  STREAMING: 'streaming'
};
var PUBLISHER_STATUSES = {
  INITIALIZING: 'initializing',
  STREAMING: 'streaming',
  STOPPED: 'stopped'
};

/***/ }),

/***/ "./src/lock.js":
/*!*********************!*\
  !*** ./src/lock.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isGetUserMediaCalled: () => (/* binding */ isGetUserMediaCalled),
/* harmony export */   setGetUserMediaCalled: () => (/* binding */ setGetUserMediaCalled)
/* harmony export */ });
// Here information about calling navigator.mediaDevices.getUserMedia is stored
// The goal is to have single source of information about getUserMedia call
// That information is needed to prevent extra request of getUserMedia for OSX(with Safari) or IOS devices

window._isGetUserMediaCalled = !!window._isGetUserMediaCalled;
var setGetUserMediaCalled = () => {
  window._isGetUserMediaCalled = true;
};
var isGetUserMediaCalled = () => window._isGetUserMediaCalled;

/***/ }),

/***/ "./src/loggers.js":
/*!************************!*\
  !*** ./src/loggers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   consoleLog: () => (/* binding */ consoleLog),
/* harmony export */   emptyLog: () => (/* binding */ emptyLog)
/* harmony export */ });
var consoleLog = function consoleLog() {
  return console.log(...arguments);
};
var emptyLog = () => void 0;

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./src/enums.js");
/* harmony import */ var _lock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lock */ "./src/lock.js");
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adapters */ "./src/adapters.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base */ "./src/base.js");
var _excluded = ["sdp"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var SAFARI_PERMISSIONS_REQUEST_MESSAGE = 'We need to get access to one of media devices to start playing stream over WebRTC in Safari (or any IOS browser). If press YES, browser will ask you for permission.';
class Player extends _base__WEBPACK_IMPORTED_MODULE_3__["default"] {
  /**
   * @param {HTMLMediaElement} media
   * @param {string} url
   * @param {object} opts
   * @param {boolean} opts.autoplay
   * @param {number} opts.retryMax - number of ws connection retries
   * @param {number} opts.retryDelay - number of connection retries
   * @param {boolean} shouldLog
   */
  constructor(media, url) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var shouldLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    super(url, opts, shouldLog);
    _defineProperty(this, "onDestroy", () => {
      this.stop();
      this.remoteVideo.removeEventListener('play', this.onVideoPlay);
    });
    _defineProperty(this, "createPeerConnection", () => {
      this.log('Player::createPeerConnection');
      this.remotePc = new _adapters__WEBPACK_IMPORTED_MODULE_2__.PeerConnection(null);
      // {iceServers: [], bundlePolicy: "max-compat"}, [{"DtlsSrtpKeyAgreement": true}]
      this.remotePc.stream_id = 'remote1';
      this.remotePc.onicecandidate = this.gotIceCandidate;
      this.remotePc.ontrack = this.gotRemoteTrack;
      this.remotePc.onconnectionstatechange = evt => {
        this.log('peer connection state:', this.remotePc.connectionState);
        if (this.remotePc.connectionState === 'closed') {
          this.stop();
          this.notify(_enums__WEBPACK_IMPORTED_MODULE_0__.PLAYER_EVENTS.FAIL, 'peer_connection_closed');
        } else if (this.remotePc.connectionState === 'failed') {
          this.stopRetry(this.play);
        }
      };

      // Logging
      this.remotePc.oniceconnectionstatechange = evt => {
        this.log('icechange:', evt);
        if (this.remotePc.iceConnectionState === 'failed') {
          this.stopRetry(this.play);
          this.notify(_enums__WEBPACK_IMPORTED_MODULE_0__.PLAYER_EVENTS.FAIL, 'ice_connection_fail');
        }
        if (this.remotePc.iceConnectionState === 'closed') {
          this.stop();
          this.notify(_enums__WEBPACK_IMPORTED_MODULE_0__.PLAYER_EVENTS.FAIL, 'ice_connection_closed');
        }
        this.notify(_enums__WEBPACK_IMPORTED_MODULE_0__.PLAYER_EVENTS.DEBUG, ['ICE connection state', this.remotePc.iceConnectionState]);
      };
      this.remotePc.onicegatheringstatechange = evt => {
        this.log('ice gathering state', this.remotePc.iceGatheringState, evt);
      };
      this.remotePc.onsignalingstatechange = evt => {
        this.log('signaling state', this.remotePc.signalingState, evt);
      };
    });
    _defineProperty(this, "checkGetUserMediaCall", () => {
      if (this.isSafariOrIOS && !(0,_lock__WEBPACK_IMPORTED_MODULE_1__.isGetUserMediaCalled)()) {
        if (confirm(SAFARI_PERMISSIONS_REQUEST_MESSAGE)) {
          (0,_lock__WEBPACK_IMPORTED_MODULE_1__.setGetUserMediaCalled)();
          var constraints = {
            audio: true,
            video: true
          };
          return navigator.mediaDevices.getUserMedia(constraints);
        } else {
          return Promise.reject();
        }
      } else {
        return Promise.resolve();
      }
    });
    _defineProperty(this, "play", () => {
      this.log('Player::play');
      this.checkGetUserMediaCall().then(() => {
        var wsUrl = new URL(this.url);
        wsUrl.pathname = wsUrl.pathname + '/webrtc';
        wsUrl.protocol = /https/.test(wsUrl.protocol) ? 'wss' : 'ws';
        this.ws = new WebSocket(wsUrl.toString());
        this.ws.onopen = evt => {
          this.createPeerConnection();
        };
        this.ws.onerror = evt => {
          this.stopRetry(this.play);
          this.notify(_enums__WEBPACK_IMPORTED_MODULE_0__.PLAYER_EVENTS.FAIL, 'ws_error', evt);
        };
        this.ws.onclose = evt => {
          this.stop();
          this.notify(_enums__WEBPACK_IMPORTED_MODULE_0__.PLAYER_EVENTS.FAIL, 'ws_closed');
        };
        this.ws.onmessage = this.onWsMsg;
      });
    });
    _defineProperty(this, "stop", () => {
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
    });
    _defineProperty(this, "gotIceCandidate", event => {
      this.log('ice candidate:', event);
      if (event.candidate) {
        this.sendWsMsg({
          type: 'candidate',
          stream_id: 'local1',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate
        });
      }
    });
    _defineProperty(this, "gotRemoteTrack", e => {
      this.log('remote track', e);
      if (e.track.kind === 'video' || e.track.kind === 'audio') {
        try {
          this.remoteVideo.srcObject = e.streams[0];
        } catch (error) {
          this.remoteVideo.src = window.URL.createObjectURL(e.streams[0]);
        }
      }
    });
    _defineProperty(this, "getSessionDescription", _ref => {
      var {
          sdp
        } = _ref,
        message = _objectWithoutProperties(_ref, _excluded);
      return new _adapters__WEBPACK_IMPORTED_MODULE_2__.SessionDescription(_objectSpread(_objectSpread({}, message), {}, {
        // I'm really shamed, but I experimented and hadn't find any other reason
        // for not playing video, so SODD helps me =)
        // https://stackoverflow.com/questions/47990094/failed-to-set-remote-video-description-send-parameters-on-native-ios
        sdp: sdp.replace(/profile-level-id=(\d|A|B|C|D|E|F)+;/, 'profile-level-id=42E01F;')
      }));
    });
    _defineProperty(this, "onWsMsg", evt => {
      this.log('ws message received');
      var message = JSON.parse(evt.data);
      if (message.type === 'offer') {
        this.onWsOfferReceived(message);
      } else if (message.type === 'candidate') {
        this.onWsIceCandidateReceived(message);
      }
    });
    _defineProperty(this, "remoteCreateAnswer", () => {
      this.log('success adding offer');
      // Теперь просим PeerConnection сделать ответ для флюссоника
      return this.remotePc.createAnswer();
    });
    _defineProperty(this, "remoteSetLocalDescription", answer => {
      this.log('now have answer', answer.sdp);
      // Получили ответ от PeerConnection и помечаем его как local
      // description
      return this.remotePc.setLocalDescription(answer);
    });
    _defineProperty(this, "remoteSendLocalDescription", () => {
      this.log('now have local desc', this.remotePc.localDescription.sdp);
      // после этого можно слать local description как ответ флюссонику
      // дальше будет обмен кандидатами
      this.sendWsMsg(this.remotePc.localDescription);
    });
    _defineProperty(this, "onDescriptionError", reason => {
      this.notify(_enums__WEBPACK_IMPORTED_MODULE_0__.PLAYER_EVENTS.DEBUG, ['failed to set remote answer', reason]);
      // stop() caused problems with playback
      // this.stop();
      this.notify(_enums__WEBPACK_IMPORTED_MODULE_0__.PLAYER_EVENTS.FAIL, 'set_remote_description_failed');
    });
    _defineProperty(this, "onWsOfferReceived", message => {
      this.log('ws message type === offer', message);
      // От флюссоника приехал SDP, который засовываем в PeerConnection
      // как remote description
      var desc = this.getSessionDescription(message);
      this.log('session description', desc);
      this.remotePc.setRemoteDescription(desc).then(this.remoteCreateAnswer).then(this.remoteSetLocalDescription).then(this.remoteSendLocalDescription).catch(this.onDescriptionError);
    });
    _defineProperty(this, "onWsIceCandidateReceived", message => {
      this.log('have candidate');
      var candidate = new _adapters__WEBPACK_IMPORTED_MODULE_2__.IceCandidate(message.candidate);
      this.remotePc.addIceCandidate(candidate, () => {}, err => {
        this.notify(_enums__WEBPACK_IMPORTED_MODULE_0__.PLAYER_EVENTS.DEBUG, ['failed to add ICE from remote:', err]);
      });
    });
    _defineProperty(this, "onVideoPlay", () => {
      this.notify(_enums__WEBPACK_IMPORTED_MODULE_0__.PLAYER_EVENTS.PLAY);
    });
    if (!(media instanceof HTMLMediaElement)) {
      throw 'First argument must be html5 video tag';
    }
    this.remoteVideo = media;
    this.remoteVideo.addEventListener('play', this.onVideoPlay);
    if (opts.autoplay) {
      this.play();
    }
  }
}

/***/ }),

/***/ "./src/publisher.js":
/*!**************************!*\
  !*** ./src/publisher.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Publisher)
/* harmony export */ });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./src/enums.js");
/* harmony import */ var _lock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lock */ "./src/lock.js");
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adapters */ "./src/adapters.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base */ "./src/base.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




class Publisher extends _base__WEBPACK_IMPORTED_MODULE_3__["default"] {
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
  constructor(streamUrl) {
    var _this;
    var _opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var shouldLog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    super(streamUrl, _opts, shouldLog);
    _this = this;
    /**
     * @param {object} opts
     * @param {object} opts.openPeerConnectionOptions
     * @param {object} opts.openPeerConnectionOptions.getMediaOptions
     * @param {function} opts.openPeerConnectionOptions.getMediaOptions.onGetUserMediaError
     */
    _defineProperty(this, "start", opts => {
      var url = new URL(this.url);
      url.protocol = /https/.test(url.protocol) ? 'wss' : 'ws';
      url.pathname = url.pathname + '/webrtc/publish';
      this.ws = new WebSocket(url.toString());
      this.ws.onopen = () => this.openPeerConnection(opts ? opts.openPeerConnectionOptions : null);
      this.ws.onmessage = this.onWsMsg;
      this.ws.onclose = event => {
        this.log("WebSocket 'onClose' fired.", event);
        if (typeof this.onWebsocketClose === 'function') {
          this.onWebsocketClose();
        }
      };
      this.ws.onerror = event => this.log("WebSocket 'onError' fired, no handler presented", event);
    });
    _defineProperty(this, "stop", () => {
      this.clearLocalStreamSource();
      if (this.peerConnection) {
        this.peerConnection.close();
        this.peerConnection = null;
      }
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      this.status = _enums__WEBPACK_IMPORTED_MODULE_0__.PUBLISHER_STATUSES.STOPPED;
    });
    /**
     * @param {object} opts
     * @param {object} opts.getMediaOptions
     * @param {function} opts.getMediaOptions.onGetUserMediaError
     */
    _defineProperty(this, "openPeerConnection", opts => {
      if (this.isSafariOrIOS) {
        this.getMedia(opts ? opts.getMediaOptions : null, cb => {
          this.log('openPeerConnection::cb');
          this.peerConnection = new _adapters__WEBPACK_IMPORTED_MODULE_2__.PeerConnection(null);
          this.peerConnection.stream_id = 'local1';
          this.peerConnection.onicecandidate = this.gotIceCandidate;
          this.log('openPeerConnection::peerConnection', this.peerConnection);
          if (typeof cb === 'function') {
            cb();
          }
        });
      } else {
        this.peerConnection = new _adapters__WEBPACK_IMPORTED_MODULE_2__.PeerConnection(null);
        this.peerConnection.stream_id = 'local1';
        this.peerConnection.onicecandidate = this.gotIceCandidate;
        this.getMedia(opts ? opts.getMediaOptions : null);
      }
    });
    _defineProperty(this, "clearLocalStreamSource", () => {
      return;
      if (this.stream) {
        this.stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
    });
    _defineProperty(this, "onWsAnswerReceived", message => {
      var description = new _adapters__WEBPACK_IMPORTED_MODULE_2__.SessionDescription(message);
      this.peerConnection.setRemoteDescription(description);
      this.log('answer');
    });
    _defineProperty(this, "onWsIceCandidateReceived", message => {
      this.log('candidate');
      var candidate = new _adapters__WEBPACK_IMPORTED_MODULE_2__.IceCandidate(message.candidate);
      this.peerConnection.addIceCandidate(candidate).then(() => {
        this.status = _enums__WEBPACK_IMPORTED_MODULE_0__.PUBLISHER_STATUSES.STREAMING;
        this.emitter.emit(_enums__WEBPACK_IMPORTED_MODULE_0__.PUBLISHER_EVENTS.STREAMING);
        this.log('streaming', this.stream);
        if (this.videoContainer) {
          this.videoContainer.srcObject = this.stream;
        }
      });
    });
    _defineProperty(this, "onWsMsg", event => {
      var message = JSON.parse(event.data);

      // TODO Remove redundant switch
      if (message.type === 'answer') {
        this.onWsAnswerReceived(message);
      } else if (message.type === 'candidate') {
        this.onWsIceCandidateReceived(message);
      }
    });
    _defineProperty(this, "gotIceCandidate", event => {
      if (event.candidate) {
        this.sendWsMsg({
          type: 'candidate',
          stream_id: 'local1',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate
        });
      }
    });
    /**
     * @param {object} opts
     * @param {function} opts.onGetUserMediaError
     * @param {function} [cb]
     */
    _defineProperty(this, "getMedia", (opts, cb) => {
      //this.clearLocalStreamSource();

      if (typeof cb === 'function') {
        cb(() => {
          this.gotMedia(this.externalStream);
        });
      } else {
        this.gotMedia(this.externalStream);
      }
      return;
      navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
        (0,_lock__WEBPACK_IMPORTED_MODULE_1__.setGetUserMediaCalled)();
        this.log('mediaDevices.getUserMedia success.');
        if (typeof cb === 'function') {
          cb(() => {
            this.log('getMedia::cb');
            this.gotMedia(stream);
          });
        } else {
          this.gotMedia(stream);
        }
      }).catch(error => {
        this.log('mediaDevices.getUserMedia exception occured.', error);
        if (opts && opts.onGetUserMediaError) {
          opts.onGetUserMediaError(error);
        }
      });
    });
    _defineProperty(this, "gotMedia", stream => {
      this.stream = stream;
      this.log('got', this.stream);
      this.log('gotMedia::peerConnection', this.peerConnection);
      this.stream.getTracks().forEach(track => this.peerConnection.addTrack(track, this.stream));
      this.peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      }).then(description => {
        return this.peerConnection.setLocalDescription(description);
      }).then(() => {
        this.sendWsMsg(this.peerConnection.localDescription);
      }).catch(error => {
        var errorMessage = 'Error establishing P2P connection.';
        this.log(errorMessage, error);
      });
    });
    /**
     *
     * @param {array} args
     * @param {string} args[0] - event name
     * @param {function} args[1] - callback for event
     * @returns {*}
     */
    _defineProperty(this, "on", function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _this.emitter.on.apply(_this.emitter, args);
    });
    var self = this;
    this.status = _enums__WEBPACK_IMPORTED_MODULE_0__.PUBLISHER_STATUSES.INITIALIZING;
    if (_opts.preview) {
      this.videoContainer = _opts.preview;
      if (_opts.previewOptions) {
        this.videoContainer.autoplay = _opts.previewOptions.autoplay;
        this.videoContainer.controls = _opts.previewOptions.controls;
        this.videoContainer.muted = _opts.previewOptions.muted;
      }
      this.videoContainer.addEventListener('loadedmetadata', function () {
        self.log("Local video videoWidth: ".concat(this.videoWidth, "px,  videoHeight: ").concat(this.videoHeight, "px"));
      });
    }
    this.externalStream = _opts.stream;
    this.onWebsocketClose = _opts.onWebsocketClose;
  }
}

/***/ }),

/***/ "./node_modules/bowser/es5.js":
/*!************************************!*\
  !*** ./node_modules/bowser/es5.js ***!
  \************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=90)}({17:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=r(18),i=function(){function e(){}return e.getFirstMatch=function(e,t){var r=t.match(e);return r&&r.length>0&&r[1]||""},e.getSecondMatch=function(e,t){var r=t.match(e);return r&&r.length>1&&r[2]||""},e.matchAndReturnConst=function(e,t,r){if(e.test(t))return r},e.getWindowsVersionName=function(e){switch(e){case"NT":return"NT";case"XP":return"XP";case"NT 5.0":return"2000";case"NT 5.1":return"XP";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return}},e.getMacOSVersionName=function(e){var t=e.split(".").splice(0,2).map((function(e){return parseInt(e,10)||0}));if(t.push(0),10===t[0])switch(t[1]){case 5:return"Leopard";case 6:return"Snow Leopard";case 7:return"Lion";case 8:return"Mountain Lion";case 9:return"Mavericks";case 10:return"Yosemite";case 11:return"El Capitan";case 12:return"Sierra";case 13:return"High Sierra";case 14:return"Mojave";case 15:return"Catalina";default:return}},e.getAndroidVersionName=function(e){var t=e.split(".").splice(0,2).map((function(e){return parseInt(e,10)||0}));if(t.push(0),!(1===t[0]&&t[1]<5))return 1===t[0]&&t[1]<6?"Cupcake":1===t[0]&&t[1]>=6?"Donut":2===t[0]&&t[1]<2?"Eclair":2===t[0]&&2===t[1]?"Froyo":2===t[0]&&t[1]>2?"Gingerbread":3===t[0]?"Honeycomb":4===t[0]&&t[1]<1?"Ice Cream Sandwich":4===t[0]&&t[1]<4?"Jelly Bean":4===t[0]&&t[1]>=4?"KitKat":5===t[0]?"Lollipop":6===t[0]?"Marshmallow":7===t[0]?"Nougat":8===t[0]?"Oreo":9===t[0]?"Pie":void 0},e.getVersionPrecision=function(e){return e.split(".").length},e.compareVersions=function(t,r,n){void 0===n&&(n=!1);var i=e.getVersionPrecision(t),s=e.getVersionPrecision(r),a=Math.max(i,s),o=0,u=e.map([t,r],(function(t){var r=a-e.getVersionPrecision(t),n=t+new Array(r+1).join(".0");return e.map(n.split("."),(function(e){return new Array(20-e.length).join("0")+e})).reverse()}));for(n&&(o=a-Math.min(i,s)),a-=1;a>=o;){if(u[0][a]>u[1][a])return 1;if(u[0][a]===u[1][a]){if(a===o)return 0;a-=1}else if(u[0][a]<u[1][a])return-1}},e.map=function(e,t){var r,n=[];if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r+=1)n.push(t(e[r]));return n},e.find=function(e,t){var r,n;if(Array.prototype.find)return Array.prototype.find.call(e,t);for(r=0,n=e.length;r<n;r+=1){var i=e[r];if(t(i,r))return i}},e.assign=function(e){for(var t,r,n=e,i=arguments.length,s=new Array(i>1?i-1:0),a=1;a<i;a++)s[a-1]=arguments[a];if(Object.assign)return Object.assign.apply(Object,[e].concat(s));var o=function(){var e=s[t];"object"==typeof e&&null!==e&&Object.keys(e).forEach((function(t){n[t]=e[t]}))};for(t=0,r=s.length;t<r;t+=1)o();return e},e.getBrowserAlias=function(e){return n.BROWSER_ALIASES_MAP[e]},e.getBrowserTypeByAlias=function(e){return n.BROWSER_MAP[e]||""},e}();t.default=i,e.exports=t.default},18:function(e,t,r){"use strict";t.__esModule=!0,t.ENGINE_MAP=t.OS_MAP=t.PLATFORMS_MAP=t.BROWSER_MAP=t.BROWSER_ALIASES_MAP=void 0;t.BROWSER_ALIASES_MAP={"Amazon Silk":"amazon_silk","Android Browser":"android",Bada:"bada",BlackBerry:"blackberry",Chrome:"chrome",Chromium:"chromium",Electron:"electron",Epiphany:"epiphany",Firefox:"firefox",Focus:"focus",Generic:"generic","Google Search":"google_search",Googlebot:"googlebot","Internet Explorer":"ie","K-Meleon":"k_meleon",Maxthon:"maxthon","Microsoft Edge":"edge","MZ Browser":"mz","NAVER Whale Browser":"naver",Opera:"opera","Opera Coast":"opera_coast",PhantomJS:"phantomjs",Puffin:"puffin",QupZilla:"qupzilla",QQ:"qq",QQLite:"qqlite",Safari:"safari",Sailfish:"sailfish","Samsung Internet for Android":"samsung_internet",SeaMonkey:"seamonkey",Sleipnir:"sleipnir",Swing:"swing",Tizen:"tizen","UC Browser":"uc",Vivaldi:"vivaldi","WebOS Browser":"webos",WeChat:"wechat","Yandex Browser":"yandex",Roku:"roku"};t.BROWSER_MAP={amazon_silk:"Amazon Silk",android:"Android Browser",bada:"Bada",blackberry:"BlackBerry",chrome:"Chrome",chromium:"Chromium",electron:"Electron",epiphany:"Epiphany",firefox:"Firefox",focus:"Focus",generic:"Generic",googlebot:"Googlebot",google_search:"Google Search",ie:"Internet Explorer",k_meleon:"K-Meleon",maxthon:"Maxthon",edge:"Microsoft Edge",mz:"MZ Browser",naver:"NAVER Whale Browser",opera:"Opera",opera_coast:"Opera Coast",phantomjs:"PhantomJS",puffin:"Puffin",qupzilla:"QupZilla",qq:"QQ Browser",qqlite:"QQ Browser Lite",safari:"Safari",sailfish:"Sailfish",samsung_internet:"Samsung Internet for Android",seamonkey:"SeaMonkey",sleipnir:"Sleipnir",swing:"Swing",tizen:"Tizen",uc:"UC Browser",vivaldi:"Vivaldi",webos:"WebOS Browser",wechat:"WeChat",yandex:"Yandex Browser"};t.PLATFORMS_MAP={tablet:"tablet",mobile:"mobile",desktop:"desktop",tv:"tv"};t.OS_MAP={WindowsPhone:"Windows Phone",Windows:"Windows",MacOS:"macOS",iOS:"iOS",Android:"Android",WebOS:"WebOS",BlackBerry:"BlackBerry",Bada:"Bada",Tizen:"Tizen",Linux:"Linux",ChromeOS:"Chrome OS",PlayStation4:"PlayStation 4",Roku:"Roku"};t.ENGINE_MAP={EdgeHTML:"EdgeHTML",Blink:"Blink",Trident:"Trident",Presto:"Presto",Gecko:"Gecko",WebKit:"WebKit"}},90:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(91))&&n.__esModule?n:{default:n},s=r(18);function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=function(){function e(){}var t,r,n;return e.getParser=function(e,t){if(void 0===t&&(t=!1),"string"!=typeof e)throw new Error("UserAgent should be a string");return new i.default(e,t)},e.parse=function(e){return new i.default(e).getResult()},t=e,n=[{key:"BROWSER_MAP",get:function(){return s.BROWSER_MAP}},{key:"ENGINE_MAP",get:function(){return s.ENGINE_MAP}},{key:"OS_MAP",get:function(){return s.OS_MAP}},{key:"PLATFORMS_MAP",get:function(){return s.PLATFORMS_MAP}}],(r=null)&&a(t.prototype,r),n&&a(t,n),e}();t.default=o,e.exports=t.default},91:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=u(r(92)),i=u(r(93)),s=u(r(94)),a=u(r(95)),o=u(r(17));function u(e){return e&&e.__esModule?e:{default:e}}var d=function(){function e(e,t){if(void 0===t&&(t=!1),null==e||""===e)throw new Error("UserAgent parameter can't be empty");this._ua=e,this.parsedResult={},!0!==t&&this.parse()}var t=e.prototype;return t.getUA=function(){return this._ua},t.test=function(e){return e.test(this._ua)},t.parseBrowser=function(){var e=this;this.parsedResult.browser={};var t=o.default.find(n.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.browser=t.describe(this.getUA())),this.parsedResult.browser},t.getBrowser=function(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()},t.getBrowserName=function(e){return e?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""},t.getBrowserVersion=function(){return this.getBrowser().version},t.getOS=function(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()},t.parseOS=function(){var e=this;this.parsedResult.os={};var t=o.default.find(i.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.os=t.describe(this.getUA())),this.parsedResult.os},t.getOSName=function(e){var t=this.getOS().name;return e?String(t).toLowerCase()||"":t||""},t.getOSVersion=function(){return this.getOS().version},t.getPlatform=function(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()},t.getPlatformType=function(e){void 0===e&&(e=!1);var t=this.getPlatform().type;return e?String(t).toLowerCase()||"":t||""},t.parsePlatform=function(){var e=this;this.parsedResult.platform={};var t=o.default.find(s.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.platform=t.describe(this.getUA())),this.parsedResult.platform},t.getEngine=function(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()},t.getEngineName=function(e){return e?String(this.getEngine().name).toLowerCase()||"":this.getEngine().name||""},t.parseEngine=function(){var e=this;this.parsedResult.engine={};var t=o.default.find(a.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.engine=t.describe(this.getUA())),this.parsedResult.engine},t.parse=function(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this},t.getResult=function(){return o.default.assign({},this.parsedResult)},t.satisfies=function(e){var t=this,r={},n=0,i={},s=0;if(Object.keys(e).forEach((function(t){var a=e[t];"string"==typeof a?(i[t]=a,s+=1):"object"==typeof a&&(r[t]=a,n+=1)})),n>0){var a=Object.keys(r),u=o.default.find(a,(function(e){return t.isOS(e)}));if(u){var d=this.satisfies(r[u]);if(void 0!==d)return d}var c=o.default.find(a,(function(e){return t.isPlatform(e)}));if(c){var f=this.satisfies(r[c]);if(void 0!==f)return f}}if(s>0){var l=Object.keys(i),h=o.default.find(l,(function(e){return t.isBrowser(e,!0)}));if(void 0!==h)return this.compareVersion(i[h])}},t.isBrowser=function(e,t){void 0===t&&(t=!1);var r=this.getBrowserName().toLowerCase(),n=e.toLowerCase(),i=o.default.getBrowserTypeByAlias(n);return t&&i&&(n=i.toLowerCase()),n===r},t.compareVersion=function(e){var t=[0],r=e,n=!1,i=this.getBrowserVersion();if("string"==typeof i)return">"===e[0]||"<"===e[0]?(r=e.substr(1),"="===e[1]?(n=!0,r=e.substr(2)):t=[],">"===e[0]?t.push(1):t.push(-1)):"="===e[0]?r=e.substr(1):"~"===e[0]&&(n=!0,r=e.substr(1)),t.indexOf(o.default.compareVersions(i,r,n))>-1},t.isOS=function(e){return this.getOSName(!0)===String(e).toLowerCase()},t.isPlatform=function(e){return this.getPlatformType(!0)===String(e).toLowerCase()},t.isEngine=function(e){return this.getEngineName(!0)===String(e).toLowerCase()},t.is=function(e,t){return void 0===t&&(t=!1),this.isBrowser(e,t)||this.isOS(e)||this.isPlatform(e)},t.some=function(e){var t=this;return void 0===e&&(e=[]),e.some((function(e){return t.is(e)}))},e}();t.default=d,e.exports=t.default},92:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n};var s=/version\/(\d+(\.?_?\d+)+)/i,a=[{test:[/googlebot/i],describe:function(e){var t={name:"Googlebot"},r=i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/opera/i],describe:function(e){var t={name:"Opera"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opr\/|opios/i],describe:function(e){var t={name:"Opera"},r=i.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/SamsungBrowser/i],describe:function(e){var t={name:"Samsung Internet for Android"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Whale/i],describe:function(e){var t={name:"NAVER Whale Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MZBrowser/i],describe:function(e){var t={name:"MZ Browser"},r=i.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/focus/i],describe:function(e){var t={name:"Focus"},r=i.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/swing/i],describe:function(e){var t={name:"Swing"},r=i.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/coast/i],describe:function(e){var t={name:"Opera Coast"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opt\/\d+(?:.?_?\d+)+/i],describe:function(e){var t={name:"Opera Touch"},r=i.default.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/yabrowser/i],describe:function(e){var t={name:"Yandex Browser"},r=i.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/ucbrowser/i],describe:function(e){var t={name:"UC Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Maxthon|mxios/i],describe:function(e){var t={name:"Maxthon"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/epiphany/i],describe:function(e){var t={name:"Epiphany"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/puffin/i],describe:function(e){var t={name:"Puffin"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sleipnir/i],describe:function(e){var t={name:"Sleipnir"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/k-meleon/i],describe:function(e){var t={name:"K-Meleon"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/micromessenger/i],describe:function(e){var t={name:"WeChat"},r=i.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qqbrowser/i],describe:function(e){var t={name:/qqbrowserlite/i.test(e)?"QQ Browser Lite":"QQ Browser"},r=i.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/msie|trident/i],describe:function(e){var t={name:"Internet Explorer"},r=i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/\sedg\//i],describe:function(e){var t={name:"Microsoft Edge"},r=i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/edg([ea]|ios)/i],describe:function(e){var t={name:"Microsoft Edge"},r=i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/vivaldi/i],describe:function(e){var t={name:"Vivaldi"},r=i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/seamonkey/i],describe:function(e){var t={name:"SeaMonkey"},r=i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sailfish/i],describe:function(e){var t={name:"Sailfish"},r=i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i,e);return r&&(t.version=r),t}},{test:[/silk/i],describe:function(e){var t={name:"Amazon Silk"},r=i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/phantom/i],describe:function(e){var t={name:"PhantomJS"},r=i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/slimerjs/i],describe:function(e){var t={name:"SlimerJS"},r=i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t={name:"BlackBerry"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t={name:"WebOS Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/bada/i],describe:function(e){var t={name:"Bada"},r=i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/tizen/i],describe:function(e){var t={name:"Tizen"},r=i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qupzilla/i],describe:function(e){var t={name:"QupZilla"},r=i.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/firefox|iceweasel|fxios/i],describe:function(e){var t={name:"Firefox"},r=i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/electron/i],describe:function(e){var t={name:"Electron"},r=i.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MiuiBrowser/i],describe:function(e){var t={name:"Miui"},r=i.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/chromium/i],describe:function(e){var t={name:"Chromium"},r=i.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/chrome|crios|crmo/i],describe:function(e){var t={name:"Chrome"},r=i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/GSA/i],describe:function(e){var t={name:"Google Search"},r=i.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t={name:"Android Browser"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/playstation 4/i],describe:function(e){var t={name:"PlayStation 4"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/safari|applewebkit/i],describe:function(e){var t={name:"Safari"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/.*/i],describe:function(e){var t=-1!==e.search("\\(")?/^(.*)\/(.*)[ \t]\((.*)/:/^(.*)\/(.*) /;return{name:i.default.getFirstMatch(t,e),version:i.default.getSecondMatch(t,e)}}}];t.default=a,e.exports=t.default},93:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:[/Roku\/DVP/],describe:function(e){var t=i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i,e);return{name:s.OS_MAP.Roku,version:t}}},{test:[/windows phone/i],describe:function(e){var t=i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.WindowsPhone,version:t}}},{test:[/windows /i],describe:function(e){var t=i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i,e),r=i.default.getWindowsVersionName(t);return{name:s.OS_MAP.Windows,version:t,versionName:r}}},{test:[/Macintosh(.*?) FxiOS(.*?)\//],describe:function(e){var t={name:s.OS_MAP.iOS},r=i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/,e);return r&&(t.version=r),t}},{test:[/macintosh/i],describe:function(e){var t=i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i,e).replace(/[_\s]/g,"."),r=i.default.getMacOSVersionName(t),n={name:s.OS_MAP.MacOS,version:t};return r&&(n.versionName=r),n}},{test:[/(ipod|iphone|ipad)/i],describe:function(e){var t=i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i,e).replace(/[_\s]/g,".");return{name:s.OS_MAP.iOS,version:t}}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t=i.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i,e),r=i.default.getAndroidVersionName(t),n={name:s.OS_MAP.Android,version:t};return r&&(n.versionName=r),n}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t=i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,e),r={name:s.OS_MAP.WebOS};return t&&t.length&&(r.version=t),r}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t=i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i,e)||i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i,e)||i.default.getFirstMatch(/\bbb(\d+)/i,e);return{name:s.OS_MAP.BlackBerry,version:t}}},{test:[/bada/i],describe:function(e){var t=i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.Bada,version:t}}},{test:[/tizen/i],describe:function(e){var t=i.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.Tizen,version:t}}},{test:[/linux/i],describe:function(){return{name:s.OS_MAP.Linux}}},{test:[/CrOS/],describe:function(){return{name:s.OS_MAP.ChromeOS}}},{test:[/PlayStation 4/],describe:function(e){var t=i.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.PlayStation4,version:t}}}];t.default=a,e.exports=t.default},94:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:[/googlebot/i],describe:function(){return{type:"bot",vendor:"Google"}}},{test:[/huawei/i],describe:function(e){var t=i.default.getFirstMatch(/(can-l01)/i,e)&&"Nova",r={type:s.PLATFORMS_MAP.mobile,vendor:"Huawei"};return t&&(r.model=t),r}},{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Nexus"}}},{test:[/ipad/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/Macintosh(.*?) FxiOS(.*?)\//],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Amazon"}}},{test:[/tablet(?! pc)/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet}}},{test:function(e){var t=e.test(/ipod|iphone/i),r=e.test(/like (ipod|iphone)/i);return t&&!r},describe:function(e){var t=i.default.getFirstMatch(/(ipod|iphone)/i,e);return{type:s.PLATFORMS_MAP.mobile,vendor:"Apple",model:t}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"blackberry"===e.getBrowserName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"BlackBerry"}}},{test:function(e){return"bada"===e.getBrowserName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"windows phone"===e.getBrowserName()},describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"Microsoft"}}},{test:function(e){var t=Number(String(e.getOSVersion()).split(".")[0]);return"android"===e.getOSName(!0)&&t>=3},describe:function(){return{type:s.PLATFORMS_MAP.tablet}}},{test:function(e){return"android"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"macos"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop,vendor:"Apple"}}},{test:function(e){return"windows"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return"linux"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return"playstation 4"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.tv}}},{test:function(e){return"roku"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.tv}}}];t.default=a,e.exports=t.default},95:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:function(e){return"microsoft edge"===e.getBrowserName(!0)},describe:function(e){if(/\sedg\//i.test(e))return{name:s.ENGINE_MAP.Blink};var t=i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i,e);return{name:s.ENGINE_MAP.EdgeHTML,version:t}}},{test:[/trident/i],describe:function(e){var t={name:s.ENGINE_MAP.Trident},r=i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){return e.test(/presto/i)},describe:function(e){var t={name:s.ENGINE_MAP.Presto},r=i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=e.test(/gecko/i),r=e.test(/like gecko/i);return t&&!r},describe:function(e){var t={name:s.ENGINE_MAP.Gecko},r=i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(apple)?webkit\/537\.36/i],describe:function(){return{name:s.ENGINE_MAP.Blink}}},{test:[/(apple)?webkit/i],describe:function(e){var t={name:s.ENGINE_MAP.WebKit},r=i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}}];t.default=a,e.exports=t.default}})}));

/***/ }),

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp('(' + token + ')|([^%]+?)', 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return [decodeURIComponent(components.join(''))];
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher) || [];

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher) || [];
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/filter-obj/index.js":
/*!******************************************!*\
  !*** ./node_modules/filter-obj/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";

module.exports = function (obj, predicate) {
	var ret = {};
	var keys = Object.keys(obj);
	var isArr = Array.isArray(predicate);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = obj[key];

		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};


/***/ }),

/***/ "./node_modules/nanoevents/index.js":
/*!******************************************!*\
  !*** ./node_modules/nanoevents/index.js ***!
  \******************************************/
/***/ ((module) => {

(
  /**
   * Interface for event subscription.
   *
   * @example
   * var NanoEvents = require('nanoevents')
   *
   * class Ticker {
   *   constructor() {
   *     this.emitter = new NanoEvents()
   *   }
   *   on() {
   *     return this.emitter.on.apply(this.events, arguments)
   *   }
   *   tick() {
   *     this.emitter.emit('tick')
   *   }
   * }
   *
   * @alias NanoEvents
   * @class
   */
  module.exports = function NanoEvents () {
    /**
     * Event names in keys and arrays with listeners in values.
     * @type {object}
     *
     * @example
     * Object.keys(ee.events)
     *
     * @alias NanoEvents#events
     */
    this.events = { }
  }
).prototype = {

  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {string} event The event name.
   * @param {...*} arguments The arguments for listeners.
   *
   * @return {undefined}
   *
   * @example
   * ee.emit('tick', tickType, tickDuration)
   *
   * @alias NanoEvents#emit
   * @method
   */
  emit: function emit (event) {
    var args = [].slice.call(arguments, 1)
    // Array.prototype.call() returns empty array if context is not array-like
    ;[].slice.call(this.events[event] || []).filter(function (i) {
      i.apply(this, args) // this === global or window
    })
  },

  /**
   * Add a listener for a given event.
   *
   * @param {string} event The event name.
   * @param {function} cb The listener function.
   *
   * @return {function} Unbind listener from event.
   *
   * @example
   * const unbind = ee.on('tick', (tickType, tickDuration) => {
   *   count += 1
   * })
   *
   * disable () {
   *   unbind()
   * }
   *
   * @alias NanoEvents#on
   * @method
   */
  on: function on (event, cb) {
    if ( true && typeof cb !== 'function') {
      throw new Error('Listener must be a function')
    }

    (this.events[event] = this.events[event] || []).push(cb)

    return function () {
      this.events[event] = this.events[event].filter(function (i) {
        return i !== cb
      })
    }.bind(this)
  }
}


/***/ }),

/***/ "./node_modules/nanoevents/unbind-all.js":
/*!***********************************************!*\
  !*** ./node_modules/nanoevents/unbind-all.js ***!
  \***********************************************/
/***/ ((module) => {

/**
 * Removes all listeners.
 *
 * @param {NanoEvents} emitter NanoEvents instance.
 *
 * @returns {undefined}
 *
 * @example
 * unbindAll(emitter)
 */
function unbindAll (emitter) {
  emitter.events = { }
}

module.exports = unbindAll


/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
const decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");
const splitOnFirst = __webpack_require__(/*! split-on-first */ "./node_modules/split-on-first/index.js");
const filterObject = __webpack_require__(/*! filter-obj */ "./node_modules/filter-obj/index.js");

const isNullOrUndefined = value => value === null || value === undefined;

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;

				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'comma':
		case 'separator':
			return key => (result, value) => {
				if (value === null || value === undefined || value.length === 0) {
					return result;
				}

				if (result.length === 0) {
					return [[encode(key, options), '=', encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};

		default:
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
				const isEncodedArray = (typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator));
				value = isEncodedArray ? decode(value, options) : value;
				const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(query, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof query !== 'string') {
		return ret;
	}

	query = query.trim().replace(/^[?#&]/, '');

	if (!query) {
		return ret;
	}

	for (const param of query.split('&')) {
		if (param === '') {
			continue;
		}

		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const shouldFilter = key => (
		(options.skipNull && isNullOrUndefined(object[key])) ||
		(options.skipEmptyString && object[key] === '')
	);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = {};

	for (const key of Object.keys(object)) {
		if (!shouldFilter(key)) {
			objectCopy[key] = object[key];
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (url, options) => {
	options = Object.assign({
		decode: true
	}, options);

	const [url_, hash] = splitOnFirst(url, '#');

	return Object.assign(
		{
			url: url_.split('?')[0] || '',
			query: parse(extract(url), options)
		},
		options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
	);
};

exports.stringifyUrl = (object, options) => {
	options = Object.assign({
		encode: true,
		strict: true
	}, options);

	const url = removeHash(object.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(object.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

	const query = Object.assign(parsedQueryFromUrl, object.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}

	let hash = getHash(object.url);
	if (object.fragmentIdentifier) {
		hash = `#${encode(object.fragmentIdentifier, options)}`;
	}

	return `${url}${queryString}${hash}`;
};

exports.pick = (input, filter, options) => {
	options = Object.assign({
		parseFragmentIdentifier: true
	}, options);

	const {url, query, fragmentIdentifier} = exports.parseUrl(input, options);
	return exports.stringifyUrl({
		url,
		query: filterObject(query, filter),
		fragmentIdentifier
	}, options);
};

exports.exclude = (input, filter, options) => {
	const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

	return exports.pick(input, exclusionFilter, options);
};


/***/ }),

/***/ "./node_modules/split-on-first/index.js":
/*!**********************************************!*\
  !*** ./node_modules/split-on-first/index.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/dev/index.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/dev/config.js");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums */ "./src/enums.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../player */ "./src/player.js");
/* harmony import */ var _publisher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../publisher */ "./src/publisher.js");





var query = query_string__WEBPACK_IMPORTED_MODULE_0__.parse(window.location.search);
var wrtcPlayer = null;
var publisher = null;
var getHostElement = () => document.getElementById('host');
var getHostContainerElement = () => document.getElementById('hostContainer');
var getNameElement = () => document.getElementById('name');
var getNameContainerElement = () => document.getElementById('nameContainer');
var getPlayerElement = () => document.getElementById('player');
var getPlayElement = () => document.getElementById('play');
var getPublishElement = () => document.getElementById('publish');
var getStopElement = () => document.getElementById('stop');
var getQualityElement = () => document.getElementById('stop');
var getStreamUrl = function getStreamUrl() {
  var hostElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getHostElement();
  var nameElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getNameElement();
  return "".concat(query.host || hostElement && hostElement.value, "/").concat(query.name || nameElement && nameElement.value);
};
var getPublisherOpts = () => {
  var [,, height] = document.getElementById('quality').value.split(/:/);
  return {
    preview: document.getElementById('preview'),
    constraints: {
      // video: {
      //   height: { exact: height }
      // },
      video: true,
      audio: true
    }
  };
};
var getPlayer = function getPlayer() {
  var playerElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getPlayerElement();
  var streamUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getStreamUrl();
  var playerOpts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    retryMax: 10,
    retryDelay: 1000
  };
  var shouldLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var log = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {
    for (var _len = arguments.length, defaultMessages = new Array(_len), _key = 0; _key < _len; _key++) {
      defaultMessages[_key] = arguments[_key];
    }
    return function () {
      for (var _len2 = arguments.length, passedMessages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        passedMessages[_key2] = arguments[_key2];
      }
      return console.log(...[...defaultMessages, ...passedMessages]);
    };
  };
  var player = new _player__WEBPACK_IMPORTED_MODULE_3__["default"](playerElement, streamUrl, playerOpts, true);
  player.on(_enums__WEBPACK_IMPORTED_MODULE_2__.PLAYER_EVENTS.PLAY, log('Started playing', streamUrl));
  player.on(_enums__WEBPACK_IMPORTED_MODULE_2__.PLAYER_EVENTS.DEBUG, log('Debugging play'));
  player.play();
  return player;
};
var stopPublishing = () => {
  if (publisher) {
    publisher.stop && publisher.stop();
    publisher = null;
  }
};
var stopPlaying = () => {
  if (wrtcPlayer) {
    wrtcPlayer.destroy && wrtcPlayer.destroy();
    wrtcPlayer = null;
  }
};
var stop = () => {
  stopPublishing();
  stopPlaying();
  getPublishElement().innerText = 'Publish';
  getPlayElement().innerText = 'Play';
};
var play = () => {
  wrtcPlayer = getPlayer();
  getPlayElement().innerText = 'Playing...';
  wrtcPlayer.play();
};
var publish = () => {
  if (publisher) publisher.stop();
  publisher = new _publisher__WEBPACK_IMPORTED_MODULE_4__["default"](getStreamUrl(), getPublisherOpts(), true);
  publisher.on(_enums__WEBPACK_IMPORTED_MODULE_2__.PUBLISHER_EVENTS.STREAMING, () => {
    getPublishElement().innerText = 'Publishing...';
  });
  publisher.start();
};
var setDefaultValues = () => {
  if (query.host) {
    getHostContainerElement().style.display = 'none';
  } else {
    getHostElement().value = _config__WEBPACK_IMPORTED_MODULE_1__["default"].host;
  }
  if (query.name) {
    getNameContainerElement().style.display = 'none';
  } else {
    getNameElement().value = _config__WEBPACK_IMPORTED_MODULE_1__["default"].name;
  }
};
var setEventListeners = () => {
  // Set event listeners
  getPublishElement().addEventListener('click', publish);
  getPlayElement().addEventListener('click', play);
  getStopElement().addEventListener('click', stop);
  getQualityElement().onchange = publish;
};
var main = () => {
  setDefaultValues();
  setEventListeners();
};
window.addEventListener('load', main);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map