'use strict';

window.onload = () => {
    let score = 0;
    let key = null;

    const socket = io();
    const board = document.getElementById('board');
    const context = board.getContext('2d');

    socket.on('score', onScoreEvent);
    socket.on('key', onKeyEvent);

    window.addEventListener('resize', onResize, false);
    onResize();

    function onScoreEvent(data) {
        console.log('TCL: -------------------------------');
        console.log('TCL: onScoreEvent -> data', data);
        console.log('TCL: -------------------------------');
        score = data;
        draw();
    }

    function onKeyEvent(data) {
        console.log('TCL: -------------------------------');
        console.log('TCL: onKeyEvent -> data', data);
        console.log('TCL: -------------------------------');
        key = data;
        draw();
    }

    // make the canvas fill its parent
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
        context.font = "30px Roboto";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText(`Score: ${score}`, board.width / 2, board.height / 2 - 200);

        if (key) {
            context.font = "200px Roboto";
            context.fillStyle = "blue";
            context.textAlign = "center";
            context.fillText(key, board.width / 2, board.height / 2);
        }
    }
};