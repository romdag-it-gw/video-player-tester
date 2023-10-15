const fs = require('fs');
const path = require('path');

const configFile = path.resolve(__dirname, './src/dev/config.js');
const configExampleFile = path.resolve(__dirname, './src/dev/config.example.js');

fs.readFile(configFile, (err) => {
  if (err) {
    console.log('Config doesn\'t exists');
    fs.copyFile(configExampleFile, configFile, (err) => {
      if (err) {
        console.log('Something happend while copying config from example');
        console.log(err);
      } else {
        console.log(`Config successcfully copied to ${configFile}`);
      }
    });
  } else {
    console.log(`Config already exists at ${configFile}`);
  }
});
