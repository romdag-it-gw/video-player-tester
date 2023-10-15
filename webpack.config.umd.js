const path = require('path');

module.exports = {
  devtool: "source-map",

  entry: {
    'FlussonicWebRTCPlayer': [path.resolve(__dirname, 'src/index.js')]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
    ],
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/'),
    library: 'FlussonicWebRTC',
    libraryTarget: 'umd',
    libraryExport: 'default'
  }
};

