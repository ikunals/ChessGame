

const express = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT);

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

