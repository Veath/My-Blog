#!/usr/bin/env node
const recast = require('recast')

// recast.run((ast, printSource) => {
//     recast.visit(ast, {
//         visitExpressionStatement: ({node}) => {
//             console.log(node)
//             return false
//         }
//     })
// })

recast.run((ast, printSource) => {
    recast.visit(ast, {
        visitFunctionDeclaration (path) {
            const node = path.node
            printSource(node)
            this.traverse(path)
        }
    })
})