const net = require('net');
const events = require('events');

const channel = new events();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function (id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function (senderId, message) {
        console.log(message);
        if (id !== senderId) {
            this.clients[id].write(message);
        }
    }
    this.on('broadcast', this.subscriptions[id]);
});

const server = net.createServer(function (client) {
    const id = client.remoteAddress + ':' + client.remotePort;
    console.log(id);
    console.log('connect');
    channel.emit('join', id, client);
    client.on('data', function (data) {
        console.log(data);
        data = data.toString();
        channel.emit('broadcast', id, data);
    }); 
});

console.log('start.....');
server.listen(8888);