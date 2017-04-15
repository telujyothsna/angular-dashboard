'use strict';
const path = require('path');

const config = {};

config.output = {
  // Absolute output directory
  path: path.join(__dirname, './dist/'),

  // Output path from the view of the page
  // Uses webpack-dev-server in development
  publicPath: '/',
  //publicPath: BUILD ? '/' : 'http://localhost:' + env.port + '/',

  // Filename for entry points
  // Only adds hash in build mode
  filename: '[name].[hash].js',

  // Filename for non-entry points
  // Only adds hash in build mode
  chunkFilename: '[name].[hash].js'
};


module.exports = exports = config;