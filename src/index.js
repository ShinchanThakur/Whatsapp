const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Filter = require('bad-words');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('New WebSocket Connection');

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed in messages!');
        }
        console.log(message);
        callback();
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});