'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Glob = require('glob')

path.join(__dirname, 'src/index.html')

module.exports = {
  mode: 'production',
  entry: [
    ... Glob.sync("src/**/*.html").map(v => path.join(__dirname, v)),
    path.join(__dirname, 'src/css/base.scss'),
    path.join(__dirname, 'src/js/index.ts'),
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 2
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: {
        loader: 'file-loader',
          options: {
            regExp: /\/src\/(.*)$/,
            name: '[1]'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css')
  ],
};
