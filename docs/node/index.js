const http = require('http');
const server = http.createServer((req, res) => {
    switch(req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', (chunk) => console.log(chunk));
    }
});

server.listen(8888);