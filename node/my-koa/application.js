const http = require('http');
const EventEmitter = require('events');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const Stream = require('stream');

class Koa extends EventEmitter {
    constructor () {
        super();
        this.middleware = []
        this.context = context;
        this.request = request;
        this.response = response;
    }
    use (fn) {
        this.middleware.push(fn);
        return this;
    }
    compose (middlewares, ctx) {
        function dispatch (index) {
            if (index === middlewares.length) return;
            let middleware = middlewares[index];
            return Promise.resolve(middleware(ctx, () => dispatch(index + 1)));
        }
        return dispatch(0);
    }
    createContext (req, res) {
        const ctx = Object.create(this.context);
        const request = ctx.request = Object.create(this.request);
        const response = ctx.response = Object.create(this.response);

        ctx.req = request.req = response.req = req;
        ctx.res = request.res = response.res = res;
        request.ctx = response.ctx = ctx;
        request.response = response;
        response.request = request;
        return ctx;
    }
    handleRequest (req, res) {
        res.statusCode = 404;
        const ctx = this.createContext(req, res);
        const fn = this.compose(this.middleware, ctx);
        fn.then(() => {
            if (typeof ctx.body === 'object') {
                res.setHeader('Content-Type', 'application/json;charset=utf8');
                res.end(JSON.stringify(ctx.body));
            } else if (ctx.body instanceof Stream) {
                ctx.body.pipe(res);
            } else if (typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) {
                res.setHeader('Content-Type', 'text/html;charset=utf8');
                res.end(ctx.body);
            } else {
                res.end(ctx.body);
            }
        });
        
    }
    listen (...args) {
        let server = http.createServer(this.handleRequest.bind(this))
        console.log('start server');
        server.listen(...args);
    }
}

module.exports = Koa;