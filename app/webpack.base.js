'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const htmlConfig = {
  template: 'src/_base.html',
  filename: 'index.html',
  minify: {
    // collapseWhitespace: true,
    hash: true
  },
  alwaysWriteToDisk: true
}

const devServerConfig = {
  contentBase: __dirname,
  compress: true,
  port: 3000,
  clientLogLevel: 'info',
};

const config = {};
config.entry = {
  app: './src/app.js',
  polyfills: './src/polyfills.js',
  // vendor: [
  //   'angular',
  //   'angular-ui-router',
  //   'angular-animate',
  //   'angular-cookies',
  //   'angular-resource',
  //   'angulartics',
  //   'd3',
  //   'highcharts',
  //   'highcharts-ng',
  //   'lodash',
  //   'moment',
  //   'ui-select',
  // ]
};

config.devtool = 'source-map';

config.module = {
  rules: [{
    test: /\.js$/,
    use: [{
      loader: 'babel-loader',
      options: {
        compact: false,
        presets: ['env']
      }
    }],
  }, {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      loader: ['css-loader', {
        loader: 'sass-loader',
        options: {
          outputStyle: 'compressed',
          includePaths: [
            path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
            path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap'),
            path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins')
          ]
        }
      }]
    })
  }, {
    test: /\.(jpg|png|gif|svg)$/i,
    use: 'file-loader',

  }, ]
};
const babiliOptions = {};
const babiliOverrides = {};

config.plugins = [
  new HtmlWebpackPlugin(htmlConfig),
  new HtmlWebpackHarddiskPlugin(),
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
  }),
]

module.exports = config