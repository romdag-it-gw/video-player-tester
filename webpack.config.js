const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "source-map",

  entry: {
    'main': [path.resolve(__dirname, 'src/dev/index.js')]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Flussonic WebRTC example",
      template: 'src/dev/index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
    ],
  },

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/')
  }
};

