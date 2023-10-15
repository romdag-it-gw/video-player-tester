
Build:

npm run build


Launch dev web:

npm run start




<h2>Play</h2>

<pre>

      var player = new FlussonicWebRTC.Player(document.getElementById('player'), 
        "http://localhost:8080/clock"
        );

</pre>


<h2>Publish</h2>

<pre>
        publisher = new FlussonicWebRTC.Publisher('http://localhost:8080/'+document.getElementById('streamName').value,
          {
            preview: document.getElementById('preview'),
            constraints: {
              video: {height: {exact: 360}},
              audio: true
            }
        });
        publisher.on('streaming', () => {
          new FlussonicWebRTC.Player(document.getElementById('preview-player'), 
            "http://localhost:8080/"+document.getElementById('streamName').value);
        });
        publisher.start();
</pre>  

## Development
_config - webpack.config.dev.js_   
_domain and stream config - src/dev/config.js (create from src/dev/config.example.js)_
```bash
yarn start
```
