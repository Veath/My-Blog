const recast = require('recast')

recast.run((ast, printSource) => {
    printSource(ast)
})