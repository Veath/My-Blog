const webpack = require('webpack')
const utils = require('./util')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const config = require('../config')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

Object.keys(common.entry).forEach(function (name) {
  common.entry[name] = ['./build/dev-client'].concat(common.entry[name])
})

let pages = Object.keys(utils.getView('./*html'))
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
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
    // new CleanWebpackPlugin(['dist']),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
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