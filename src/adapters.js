export const PeerConnection =
  window.RTCPeerConnection ||
  window.mozRTCPeerConnection ||
  window.webkitRTCPeerConnection;

export const IceCandidate =
  window.RTCIceCandidate || window.mozRTCIceCandidate || window.RTCIceCandidate;

export const SessionDescription =
  window.RTCSessionDescription ||
  window.mozRTCSessionDescription ||
  window.RTCSessionDescription;
