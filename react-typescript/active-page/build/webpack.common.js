const path = require('path')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./util')

let entriesObj = utils.getView('./src/entrance/*.js')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: entriesObj,
  output: {
    filename: '[name].bundle.js',
    path: '/dist',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath}),
                  require('postcss-cssnext')(),
                  require('postcss-adaptive')({
                    remUnit: 75,
                    autoRem: true
                  }),
                  require('cssnano')({'autoprefixer': false})
                ]
              }
            }
          ]
        }),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      'static': path.resolve(__dirname, '../static')
    }
  },
}