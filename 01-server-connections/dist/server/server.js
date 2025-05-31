"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express = require("express");
const path = require("path");
const nombreGame_1 = require("./nombreGame");
const PORT = 3000;
const app = express();
app.use(express.static(path.join(__dirname, '../client')));
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
const game = new nombreGame_1.default();
io.on('connection', (socket) => {
    console.log('User is connected : ' + socket.id);
    game.LuckyNumbers[socket.id] = Math.floor(Math.random() * 20);
    socket.emit('message', 'Welcome. Your lucky number is ' + game.LuckyNumbers[socket.id]);
    socket.broadcast.emit('message', 'Everyone say welcome to ' + socket.id);
    socket.on('disconnect', () => {
        console.log('socket disconnected : ' + socket.id);
        socket.broadcast.emit('message', socket.id + ' has now departed.');
    });
});
server.listen(PORT, () => {
    console.log('Server is listening on Port ' + PORT);
});
setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 20);
    const winners = game.GetWinners(randomNumber);
    if (winners.length) {
        winners.forEach((w) => {
            io.to(w).emit('message', 'You win with ' + randomNumber);
        });
    }
    io.emit('message', randomNumber);
}, 1000);
