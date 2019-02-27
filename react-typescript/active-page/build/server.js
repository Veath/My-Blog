const webpack = require("webpack")
const devWebpackConifg = require("./webpack.dev")
const compiler = webpack(devWebpackConifg)
const config = require('../config')
const path = require('path')
const opn = require('opn')
const express = require('express')
const app = express()

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler,{
  publicPath: devWebpackConifg.output.publicPath,
  quiet: true
})

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    webpackHotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

app.use(webpackDevMiddleware)
app.use(webpackHotMiddleware)



webpackDevMiddleware.waitUntilValid(() => {
  // when env is testing, don't need open it
  opn('http://localhost:3000')
})

app.listen(3000)