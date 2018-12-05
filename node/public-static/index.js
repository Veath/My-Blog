const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');

const root = __dirname;
console.log(root, process.cwd());

http.createServer((req, res) => {
    const url = parse(req.url);
    const path = join(root, url.pathname);
    console.log(path);
}).listen(3000);