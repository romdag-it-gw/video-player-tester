import NanoEvents from "nanoevents";
import {consoleLog, emptyLog} from "./loggers";
import bowser from "bowser";
import unbindAll from "nanoevents/unbind-all";

export default class WebRTCBase {
  constructor(url, opts = {}, shouldLog = false) {
    this.url = url;
    this.emitter = new NanoEvents();
    this.notify = this.emitter.emit.bind(this.emitter);
    this.log = shouldLog ? consoleLog : emptyLog;

    this.retryMax = opts.retryMax || 1;
    this.retryDelay = opts.retryDelay || 1000;
    this.retryCounter = this.retryMax;

    this.ws = null;

    const { browser, os } = bowser.getParser(
      window.navigator.userAgent,
    ).parsedResult;
    this.isSafariOrIOS = browser.name === 'Safari' || os.name === 'iOS';
  }

  destroy = () => {
    unbindAll(this.emitter);
    if (typeof this.onDestroy === 'function') {
      this.onDestroy();
    }
  };

  /**
   * Used to stop only after retries limit exceeded
   * @param {function} cb
   */
  stopRetry = cb => {
    this.retryCounter -= 1;
    if (this.retryCounter > 0) {
      setTimeout(cb, this.retryDelay);
    } else {
      this.stop();
    }
  };

  /**
   * Do this for all method, that shoul be implemented in descendants
   */
  stop = this.shouldImplementError('stop');

  retryCounterReset = () => {
    this.retryCounter = this.retryMax;
  };

  sendWsMsg = msg => {
    this.waitForConnection(() => this.ws.send(JSON.stringify(msg)), 20);
  };

  waitForConnection = (cb, interval) => {
    if (this && this.ws) {
      if (this.ws.readyState === 1) {
        cb();
      } else {
        setTimeout(() => this.waitForConnection(cb, interval), interval);
      }
    }
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

  shouldImplementError(name) {
    return () => {
      console.error(`Custom ${name} method should be implemented for WebRTCBase descendants`);
      throw new Error();
    }
  }
}
