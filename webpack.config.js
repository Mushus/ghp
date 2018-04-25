"use strict";

const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    'css/base': path.join(__dirname, "src/css/base.scss"),
    'js/base': path.join(__dirname, "src/js/base.ts"),
    'js/top': path.join(__dirname, "src/js/top.ts")
  },
  output: {
    path: path.join(__dirname, "/dist/"),
    filename: "[name].js",
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
  externals: {
    'three/build/three.module': 'THREE'
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
    new ExtractTextPlugin("[name].css")
  ]
};
