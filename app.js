

const express = require('express');
const { instrument } = require('@socket.io/admin-ui');
const io = require('socket.io')(3000, {
    cors: {
        origin: ["http://localhost:8080", "https://admin.socket.io"],
    }
});

instrument(io, { auth: false });

const app = express();

app.listen(8080);

app.get("/", (req, res) => {
    res.sendFile("/views/index.html", {root: __dirname});
});

app.use(express.static('public', {root: __dirname}));
app.use('/js', express.static('public/js', {root: __dirname}));

io.on('connection', (socket) => {

    socket.on('roomkey', (room, timeControl) => {
        socket.join(room);
    }); 

    socket.on('handshake', (room) => {
        socket.to(room).emit("serverHandshake", true);
    }); 

    socket.on('received', (room, timeControl) => {
        socket.to(room).emit("setTimeControl", timeControl);
    });

    socket.on('playerMove', (oldCoords, newCoords, room) => {
        socket.to(room).emit("posChange", oldCoords, newCoords);
    }); 

    socket.on('turnChangeServer', (room, color) => {
        socket.to(room).emit("turnChangeClient", color);
    });

});

