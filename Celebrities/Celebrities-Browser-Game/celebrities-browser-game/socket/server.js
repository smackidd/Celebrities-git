const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5002;

//const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    console.log('name', name, 'room', room);
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log('user', user);
    console.log(`${user.name} has joined`);
    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined` });

    console.log('user.room', user.room);

    io.to(user.room).emit('roomData', {
      room: user.room,
      players: getUsersInRoom(user.room),
    });
    // io.to(user.room).emit('roomUsers', {
    //     room: user.room,
    //     users: getRoomUsers(user.room)
    // });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    // io.to(user.room).emit('roomData', {
    //   room: user.room,
    //   users: getUsersInRoom(user.room),
    // });

    callback();
  });

  socket.on('teams', (team) => {
    console.log('team', team, 'room', team.room);
    socket.broadcast.to(team.room).emit('newTeams', { newTeam: team.team });
  });

  socket.on('joinTeam', (teams) => {
    console.log('team', teams, 'room', teams.room, 'name', teams.name);
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('roomData', {
        room: user.room,
        players: getUsersInRoom(user.room),
      });
    }
    if (teams) {
      let teamName;
      // send this out to teams.js
      teams.teams.map((team) => {
        if (team.members.user === teams.name) teamName = team.teamName;
      });
      io.to(teams.room).emit('message', {
        user: 'admin',
        text: `${teams.name} has joined ${teamName}`,
      });
      socket.broadcast
        .to(teams.room)
        .emit('joinTeam', { newTeams: teams.teams });
    }
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log(`${user.name} has disconnected`);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        players: getUsersInRoom(user.room),
      });
    }
  });
});

//app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
