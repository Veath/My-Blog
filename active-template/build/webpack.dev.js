const webpack = require('webpack')
const util = require('./util')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

Object.keys(common.entry).forEach(function (name) {
  common.entry[name] = ['./build/dev-client'].concat(common.entry[name])
})

let pages = Object.keys(util.getView('./*html'))
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // run start 走这里！
  // run dev 走server.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    disableHostCheck: true,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  optimization: {
    namedModules: true
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true,
    }),
  ]
})

pages.forEach(pathname => {
  let htmlname = pathname
  let conf = {
    filename: `${htmlname}.html`,
    template: `${pathname}.html`,
    hash: true,
    chunks: [htmlname],
    minify: {
      removeAttributeQuotes:true,
      removeComments: true,
      collapseWhitespace: true,
      removeScriptTypeAttributes:true,
      removeStyleLinkTypeAttributes:true
    }
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
})
