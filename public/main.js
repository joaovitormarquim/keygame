'use strict';

window.onload = () => {
    let players = 0;
    let score = 0;
    let key = '';

    const socket = io();
    const board = document.getElementById('board');
    const context = board.getContext('2d');

    function onGameEvent(data) {
        score = data.score || score;
        key = data.key || key;
        players = data.players || players;
        draw();
    }

    function onResize() {
        board.width = window.innerWidth;
        board.height = window.innerHeight;
        draw();
    }

    function clear() {
        context.clearRect(0, 0, board.width, board.height);
    }

    function draw() {
        clear();

        context.font = "25px Roboto";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText(`Players: ${players}  Score: ${score}`, board.width / 2, board.height / 2 - 200);

        context.font = "25px Roboto";
        context.fillStyle = "green";
        context.textAlign = "center";
        context.fillText('PRESS', board.width / 2, board.height / 2 - 150);

        context.font = "200px Roboto";
        context.fillStyle = "green";
        context.textAlign = "center";
        context.fillText(key, board.width / 2, board.height / 2);
    }

    function onKeyPress(event) {
        socket.emit('key', event.key)
    }

    function onDisconnect() {
        clear();

        context.font = "200px Roboto";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText('Você perdeu!', board.width / 2, board.height / 2);
    }

    socket.on('game', onGameEvent);
    socket.on('disconnect', onDisconnect);
    window.addEventListener('resize', onResize, false);
    window.addEventListener('keypress', onKeyPress);
    onResize();
};