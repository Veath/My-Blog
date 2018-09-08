const recast = require("recast");
const { variableDeclaration, variableDeclarator, functionExpression } = recast.types.builders

console.log('start')

const code = function add(a, b) {
    return a +
        // 有什么奇怪的东西混进来了
    b
}

const ast = recast.parse(code)
const add = ast.program.body[0]

ast.program.body[0] = variableDeclaration('const', [
    variableDeclarator(add.id, functionExpression(
        null,
        add.params,
        add.body
    ))
])
// 原封不动的输出内容
// const output = recast.print(ast).code

// 美化格式，去除注释
const output = recast.prettyPrint(ast, { tabWidth: 2}).code
console.log(output)