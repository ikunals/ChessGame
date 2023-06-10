

const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

server.listen(PORT);

app.get("/", (req, res) => {
    res.sendFile("/views/index.html", {root: __dirname});
});

app.use(express.static('public', {root: __dirname}));
app.use('/js', express.static('public/js', {root: __dirname}));

io.on('connection', (socket) => {

    socket.on('roomkey', (room) => {
        socket.join(room);
    }); 

    // second player sends this, which then we send to first player that its go time
    socket.on('initHandshake', (room) => {
        socket.to(room).emit("serverHandshake", true);
    }); 

    // first player after receiving confirmation then sends the time control to use
    socket.on('receivedHandshake', (room, timeControl) => {
        socket.to(room).emit("setTimeControl", timeControl);
    });

    // for move comms
    socket.on('playerMove', (oldCoords, newCoords, room) => {
        socket.to(room).emit("posChange", oldCoords, newCoords);
    }); 

    //easier way of changing colors
    socket.on('turnChangeServer', (room, color) => {
        socket.to(room).emit("turnChangeClient", color);
    });

});

