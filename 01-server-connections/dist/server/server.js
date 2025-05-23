"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();
app.use(express.static(path.join(__dirname, '../client')));
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
let clientCount = 0;
io.on('connection', (socket) => {
    clientCount++;
    console.log('User is connected : ' + socket.id);
    console.log('Number of Clients: ', clientCount);
    socket.emit('message', 'Welcome = ' + socket.id);
    socket.broadcast.emit('message', 'Everyone say welcome to ' + socket.id);
    socket.on('disconnect', () => {
        clientCount--;
        console.log('socket disconnected : ' + socket.id);
        console.log('Number of Clients: ', clientCount);
        socket.broadcast.emit('message', socket.id + ' has now departed.');
    });
});
server.listen(PORT, () => {
    console.log('Server is listening on Port ' + PORT);
});
setInterval(() => {
    io.emit('message', Math.floor(Math.random() * 100));
}, 1000);
