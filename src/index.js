const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('New WebSocket Connection');

    socket.emit('welcome');
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});