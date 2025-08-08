"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express = require("express");
const path = require("path");
const nombreGame_1 = require("./nombreGame");
const port = 3000;
const app = express();
app.use(express.static(path.join(__dirname, '../client')));
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
const game = new nombreGame_1.default();
const players = {};
io.on('connection', (socket) => {
    console.log('a user connected : ' + socket.id);
    socket.on('joining', (uName) => {
        if (players[uName]) {
            players[uName].socketId = socket.id;
            socket.emit('joined', 'Hello "' +
                uName +
                '", welcome back, your lucky number is ' +
                players[uName].luckyNumber);
        }
        else {
            players[uName] = {
                luckyNumber: Math.floor(Math.random() * 20),
                socketId: socket.id
            };
            socket.emit('joined', 'Hello new player named "' +
                uName +
                '", your lucky number is ' +
                players[uName].luckyNumber);
        }
        game.LuckyNumbers[socket.id] = players[uName].luckyNumber;
        socket.broadcast.emit('message', 'Everybody, say hello to "' + uName + '"');
    });
    socket.on('disconnect', () => {
        console.log('socket disconnected : ' + socket.id);
        const player = Object.keys(players).find((p) => {
            return players[p].socketId === socket.id;
        });
        if (player) {
            socket.broadcast.emit('message', 'Player "' + player + '" has left the building');
        }
    });
});
server.listen(port, () => {
    console.log('Server listening on port ' + port);
});
setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 20);
    const winners = game.GetWinners(randomNumber);
    if (winners.length) {
        winners.forEach((w) => {
            io.to(w).emit('message', 'You are the winner with ' + randomNumber + '.');
        });
    }
    io.emit('message', randomNumber);
}, 1000);
