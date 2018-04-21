'use strict';
const webpack = require('webpack');
const confg = require('./webpack.config');

module.exports = Object.assign({
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
  },
  watchOptions: {
    poll: true
  },
  plugins: [
    new webpack.IgnorePlugin(/node_modules/),
    ... confg.plugins
  ]
}, confg)
