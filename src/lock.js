// Here information about calling navigator.mediaDevices.getUserMedia is stored
// The goal is to have single source of information about getUserMedia call
// That information is needed to prevent extra request of getUserMedia for OSX(with Safari) or IOS devices

window._isGetUserMediaCalled = !!window._isGetUserMediaCalled;
export const setGetUserMediaCalled = () => {
  window._isGetUserMediaCalled = true;
};
export const isGetUserMediaCalled = () => window._isGetUserMediaCalled;
