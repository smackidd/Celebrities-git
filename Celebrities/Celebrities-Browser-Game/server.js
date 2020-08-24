const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
//const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');


 
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use('/', require('./routes/currentUser'));


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/setup', (req,res) => {
    res.sendFile(__dirname + "/public/" + "setup.html");
});

// Run when client connects
io.on('connection', socket => {
    

    // broadcast to a single client
    socket.emit('message', formatMessage('Admin', 'Welcome to Celebrities'));

    // Broadcast to everyone but user when a player joins the game
    socket.broadcast.emit('message', formatMessage('Admin', 'A user has joined the chat'));

    // Broadcast to everyone
    // io.emit();
 
    // when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage('Admin', 'A user has left the chat'));
    });

    // listen for a chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    });
});










const PORT = 3002 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));