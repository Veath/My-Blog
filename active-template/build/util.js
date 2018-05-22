const glob = require('glob')
const path = require('path')
function getView (globPath) {
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

module.exports = getView