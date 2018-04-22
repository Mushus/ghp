"use strict";

const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: [
    path.join(__dirname, "src/css/base.scss"),
    path.join(__dirname, "src/js/index.ts")
  ],
  output: {
    path: path.join(__dirname, "/dist/"),
    filename: "js/[name].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                url: false,
                importLoaders: 2
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: {
          loader: "file-loader",
          options: {
            regExp: /\/src\/(.*)$/,
            name: "[1]"
          }
        }
      },
      {
        test: /\.ejs$/,
        use: {
          loader: "ejs-compiled-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    ...glob
      .sync("src/**/*.ejs")
      .filter(v => !v.startsWith("src/shared/"))
      .map(
        v =>
          new HtmlWebpackPlugin({
            inject: false,
            minify: true,
            filename: v.replace(/^src\/(.*)\.ejs$/, "$1.html"),
            template: path.join(__dirname, v)
          })
      ),
    new ExtractTextPlugin("css/[name].css")
  ]
};
