# flussonic-webrtc-player

Flussonic WebRTC Player is a JavaScript library for publishing and playing video via WebRTC. It relies on Flussonic backend, HTML5 video and WebRTC. 

Install it in your project and use in your website or application to exchange video via WebRTC with Flussonic.


The library contains classes:

- `Publisher` for video publication from your app to Flussonic Media Server.
- `Player` for playback of published video in your app.

## Installation

Install `flussonic-webrtc-player` from NPM by running the command:

```
npm install --save @flussonic/flussonic-webrtc-player
```

## Publisher

Used to stream video via WebRTC from a client app to other clients through Flussonic.

### Usage

#### With webpack

```javascript
import { Publisher, PUBLISHER_EVENTS, PUBLISHER_STATUSES } from '@flussonic/flussonic-webrtc-player';
// ...
const publisher = new Publisher(url, opts, shouldLog);
```

#### With script tag:
```html
<script type="text/javascript" src="../../dist/index.js"></script>
<script>
  const { Publisher, PUBLISHER_EVENTS, PUBLISHER_STATUSES } = window.FlussonicWebRTCPlayer;
  // ...
  const publisher = Publisher(url, opts, shouldLog);
</script>
```

Where:

`url` - a stream's URL.

`opts` - a plain object, it can include:

- `preview?: HTMLMediaElement` - if passed, then shows preview before the stream is loaded. This is an element in which you can output a published stream without creating a separate player listening to the same stream.

- `previewOptions?: object` - preview options object. 

- `previewOptions?.autoplay?` - if `true`, the playback of the preview will start automatically.

- `previewOptions?.controls?` - if `true`, the preview will have controls.

- `previewOptions?.muted?` - if `true`, the preview will be muted.

- `constraints` - [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints).

- `onWebsocketClose()` - triggered when the WebSocket connection is closed.

`shouldLog` - if passed, internal events will be logged to console (`true`|`false`).

### Fields

- **status** - the status of a current publisher, possible values are `'initializing'|'streaming'|'stopped'`.

### Methods

- **start(opts)** - starts publication and sets the current publisher's `status` to `streaming`.

```typescript
start(opts?: {
  openPeerConnectionOptions?: {
    getMediaOptions?: {
      // Called if mediaDevices.getUserMedia fails
      onGetUserMediaError: (error: Error) => void
    }
  }
}) => void
```

- **stop()** - stops stream's tracks; closes a WebSocket connection; sets the current publisher status to `stopped`.
- **on(event, cb)** - subscribes for `event` with the callback `cb`. Events are listed below: 

    - `STREAMING` - runs when an ICE candidate is received and the streaming is started.

### Example

```javascript
import { Publisher, PUBLISHER_EVENTS, PUBLISHER_STATUSES } from '@flussonic/flussonic-webrtc-player';
const publisher = new Publisher(
  // The URL to a Flussonic stream that has a published source
  'https://FLUSSONIC_IP/STREAM_NAME',
  {
    // A <video> or <audio> element for previewing a published stream
    preview: document.getElementById('preview'),
    previewOptions: {
      autoplay: true,
      controls: true,
      muted: false,
    },
    constraints: {
      video: true,
      audio: true,
    },
    onWebsocketClose: () => console.log('Publishing socket closed'),
  },
  // Log to console the Publisher's internal debug messages?
  true,
);
publisher.on(PUBLISHER_EVENTS.STREAMING, () => {
    console.log('Streaming started');
});
publisher.start();
// ...
publisher.stop();
```



## Player

Used for playing back video from Flussonic via WebRTC on a client.

### Usage

#### With webpack
```javascript
import { Player, PLAYER_EVENTS } from '@flussonic/flussonic-webrtc-player';
// ...
const player = new Player(element, url, opts, shouldLog);
```
#### With script tag:
```html
<script type="text/javascript" src="../../dist/index.js"></script>
<script>
  const { Player, PLAYER_EVENTS } = window.FlussonicWebRTCPlayer;
  // ...
  const player = new Player(element, url, opts, shouldLog);
</script>
```

Where:

`element` - a `<video>` DOM element used for viewing a stream.

`url` - the stream's URL.

`opts` - a plain object, it can include options:

- `autoplay` - starts playback automatically (`true`|`false`).

`shouldLog` - if passed, internal events will be logged to console (`true`|`false`).


### Methods

- **play()** - starts the playback.
- **stop()** - stops the playback, closes the WebSocket connection, sets `srcObject` of `<video>` to null.
- **destroy()** - calls `stop()` and unbinds all listeners.
- **on(event, cb)** - subscribes for `event` with the callback `cb`. Events are listed below: 

    - `FAIL` - when an error occurs, runs with the message that describes this error.
    - `PLAY` - runs when playback starts.
    - `DEBUG` - for development puproses.

### Example

```javascript
import { Player, PLAYER_EVENTS } from '@flussonic/flussonic-webrtc-player';
const publisher = new Player(
  // A <video> or <audio> element to playback the stream from Flussonic
  document.getElementById('player'),
  // The URL of the stream from Flussonic
  'https://FLUSSONIC_IP/STREAM_NAME',
  // Options
  { autoplay: true },
  // Log to console the Player's internal debug messages?
  true,
);
player.on(PLAYER_EVENTS.PLAY, (msg) => console.log(`Play: ${msg}`));
player.on(PLAYER_EVENTS.DEBUG, (msg) => console.log(`Debug: ${msg}`));
player.play();
// ...
player.stop();
// ...
player.destroy();
```
