// 'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});
// const webpack = require('webpack');
// const webpackMerge = require('webpack-merge');
// const baseConfig = require('./webpack.base');
// const devConfig = require('./webpack.dev');
// const prodConfig = require('./webpack.prod');

// module.exports = (env) => {
//   let config;

//   if (env === 'production') {
//     config = webpackMerge(baseConfig, prodConfig);
//   } else {
//     config = webpackMerge(baseConfig, devConfig);
//   }
//   console.log(config);
//   return config;
// };


module.exports = {
  devServer: {
    port: 7777,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
  },
  entry: {
    app: './src/app.js',
    polyfills: './src/polyfills.js',
    vendor: [
      'angular',
      'angular-animate',
      'angular-cookies',
      'angular-ui-bootstrap',
      'angular-ui-router',

      'angular-resource',
      'angular-touch',
      'd3',

      'lodash',
      'moment',
      'ui-select',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [{
        test: /\.scss$/,
        // use: [{
        //   loader: 'style-loader'
        // }, {
        //   loader: 'css-loader'
        // }, {
        //   loader: 'sass-loader',
        //   options: {
        //     outputStyle: 'compressed',
        //     precision: 10,
        //     sourceComments: false,
        //     includePaths: [
        //       path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
        //       path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap'),
        //       path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins')
        //     ]
        //   }
        // }]
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader",
            options: {
              outputStyle: 'compressed',
              precision: 10,
              sourceComments: false,
              includePaths: [
                path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
                path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap'),
                path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins')
              ]
            }
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, 'node_modules/lodash-es/')
        ],
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'ng-annotate-loader'
        }, {
          loader: 'babel-loader',
          options: {
            presets: [
              ["es2015", { "loose": true, modules: false }]
            ],
            plugins: ["transform-runtime",
              "transform-flow-comments",
              "transform-class-properties"
            ]
          }
        }]
      }, {
        test: /\.html/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      }, {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/',
          }
        }]
      }
    ]
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      // minify: {
      //     collapseWhitespace: true
      // },
      hash: true,
      template: './src/_base.html', // Load a custom template (ejs by default see the FAQ for details)
    })
  ]
}