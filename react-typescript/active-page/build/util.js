const config = require('../config')
const glob = require('glob')
const path = require('path')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'development'
    ? config.dev.assetsSubDirectory
    : config.build.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.getView = function (globPath) {
  let files = glob.sync(globPath)

  let entries = {},
    entry, dirname, basename, pathname, extname

  files.forEach(item => {
    entry = item
    dirname = path.dirname(entry)
    extname = path.extname(entry)
    basename = path.basename(entry, extname)
    pathname = path.join(dirname, basename)
    if (extname === '.html') {
      entries[pathname] = entry
    } else if (extname === '.js') {
      entries[basename] = entry
    }
  })
  return entries
}

exports.setPublicPath = function () {
  switch (process.env.NODE_ENV) {
    case 'development':
      return config.dev.assetsPublicPath
    case 'production':
    case 'build':
    case 'uat':
      return config.build.assetsPublicPath
    case 'cdn':
      return config.build.assetsCdnPath
    default:
      return config.dev.assetsPublicPath
  }
}