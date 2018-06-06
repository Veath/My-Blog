const path = require('path')
const webpack = require('webpack')
const utils = require('./util')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const config = require('../config')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let pages = Object.keys(utils.getView('./*html'))
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        }
      }
    }
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new ExtractTextPlugin({
      filename: path.posix.join('static', 'css/[name].[hash].css'),
      allChunks: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new CleanWebpackPlugin(['./dist'], {
      root: path.resolve(__dirname, '..')
    })
  ]
})

pages.forEach(pathname => {
  let htmlname = pathname
  let conf = {
    filename: `${htmlname}.html`,
    template: `${pathname}.html`,
    hash: true,
    chunks: ['manifest', 'vendor', htmlname],
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