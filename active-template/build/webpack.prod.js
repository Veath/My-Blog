const path = require('path')
const webpack = require('webpack')
const getView = require('./util')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let pages = Object.keys(getView('./*html'))
module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
      filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
      path: path.resolve(__dirname, '../dist'),
      publicPath: './'
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: [
      new CleanWebpackPlugin(['./dist'], {
        root: path.resolve(__dirname, '..')
      }),
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),

      new ExtractTextPlugin({
        filename: path.posix.join('static', 'css/[name].[contenthash].css'),
        allChunks: true,
      }),
      new webpack.HashedModuleIdsPlugin(),
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