// const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charactersLength = characters.length;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

function onConnection(socket) {
    socket.emit('score', 0);
    socket.emit('key', characters.charAt(Math.floor(Math.random() * charactersLength)));
    socket.on('key', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));