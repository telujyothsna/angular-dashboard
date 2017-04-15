'use strict';
const path = require('path');
const config = {
  devServer: {
    port: 7777,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: '/.tmp/'
  }
};

config.devtool = 'cheap-module-source-map';
config.output = {
  // Absolute output directory
  path: path.join(__dirname, '/.tmp/'),

  // Output path from the view of the page
  // Uses webpack-dev-server in development
  publicPath: path.resolve(__dirname, '/.tmp/'),

  // Filename for entry points
  // Only adds hash in build mode
  filename: '[name].bundle.js',

  // Filename for non-entry points
  // Only adds hash in build mode
  chunkFilename: '[name].bundle.js'
};


module.exports = exports = config;