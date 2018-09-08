const recast = require("recast");

console.log('start')

const code = function add(a, b) {
    return a + b
}

const ast = recast.parse(code);
const add = ast.program.body[0].body.body

console.log(add)