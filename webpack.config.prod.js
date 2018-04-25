"use strict";
const webpack = require("webpack");
const confg = require("./webpack.config");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = Object.assign(
  {
    mode: "production",
    plugins: [...confg.plugins, new UglifyJsPlugin()]
  },
  confg
);
