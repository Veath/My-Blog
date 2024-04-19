const Koa = require('./application');
const app = new Koa();

// app.use((crx, next) => {
//     console.log(1)
//     next()
//     console.log(2)
//     crx.body = 'hello world'
// })
// app.use((crx, next) => {
//     console.log(3)
//     next()
//     console.log(4)
// })
// app.use((crx, next) => {
//     console.log(5)
//     next()
//     console.log(6)
// })

// app.use(async (ctx, next) => {
//     console.log(1)
//     await next()
//     console.log(2)
// })
app.use(async (ctx, next) => {
    debugger
    console.log(3)
    let p = new Promise((resolve, roject) => {
        setTimeout(() => {
            console.log('3.5')
            resolve()
        }, 3000)
    })
    await p.then()
    await next()
    console.log(4)
    ctx.body = 'hello world'
})

app.listen(3000);
