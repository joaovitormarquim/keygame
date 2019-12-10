const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const characters = require('./characters');

let players = 0;
const playersMap = {};

app.use(express.static(__dirname + '/public'));
io.on('connection', onConnection);
http.listen(port, console.log('listening on port ' + port));

function onConnection(socket) {
    socket.score = 10;
    addPlayer(socket);
    socket.on('key', (key) => onKeyPress(socket, key));
    socket.on('disconnect', () => removePlayer(socket));
    updatePlayer(socket);
}

function onKeyPress(socket, key) {
    if (characters.compareCaseInsensitive(socket.key, key)) {
        socket.score++;
        playerScored(socket);
    } else {
        socket.score--;
    }
    updatePlayer(socket);
}

function addPlayer(socket) {
    playersMap[socket.id] = socket;
    players++;
    resetScores();
    updatePlayersCount();
}

function removePlayer(socket) {
    delete playersMap[socket.id];
    players--;
    updatePlayersCount();
}

function updatePlayersCount() {
    io.emit('game', { players });
}

function updatePlayer(socket) {
    if (socket.score <= 0) {
        socket.disconnect(true);
    }
    socket.key = characters.getRandomChar();
    socket.emit('game', { score: socket.score, key: socket.key });
}

function playerScored(socket) {
    for (id in playersMap) {
        if (id !== socket.id) {
            playersMap[id].score--;
            updatePlayer(playersMap[id]);
        }
    }
}

function resetScores() {
    for (id in playersMap) {
        playersMap[id].score = 10;
        updatePlayer(playersMap[id]);
    }
}