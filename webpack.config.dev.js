const path = require('path');
const defaultConfig = require('./webpack.config');

const getDevConfig = (config = defaultConfig) => ({
  ...defaultConfig,
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
  },
});

module.exports = getDevConfig();
