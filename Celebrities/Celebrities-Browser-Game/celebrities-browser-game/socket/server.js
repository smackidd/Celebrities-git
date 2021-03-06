const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/users.js');
const {
  addTeam,
  addMember,
  removeMember,
  removeTeam,
  getTeams,
  getTeam,
  getMemberInTeam,
} = require('./utils/teams.js');
const {
  addPlayer,
  removePlayer,
  getPlayer,
  getPlayersInRoom,
} = require('./utils/players');

const PORT = process.env.PORT || 5002;

//const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  pingInterval: 500000,
  pingTimeout: 120000000,
});

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    console.log('name', name, 'room', room);
    const { error, user } = addUser({ id: socket.id, name, room });
    const { player } = addPlayer({ id: socket.id, name, room });
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
      users: getUsersInRoom(user.room),
    });

    io.to(player.room).emit('playerData', {
      room: player.room,
      players: getPlayersInRoom(player.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('teams', (data) => {
    console.log(
      'teamName',
      data.teamName,
      'room',
      data.room,
      'name',
      data.name
    );
    const teams = addTeam({ teamName: data.teamName, room: data.room });
    console.log('teams', teams);
    io.to(data.room).emit('message', {
      user: 'admin',
      text: `${data.name} created team ${data.teamName}`,
    });
    io.to(data.room).emit('teams', { teams });
  });

  socket.on('joinTeam', (data) => {
    console.log(
      'teamID',
      data.joinTeamID,
      'room',
      data.room,
      'name',
      data.name
    );
    const player = removePlayer(socket.id);
    // remove user from the players list before adding to
    // a team
    if (player) {
      io.to(player.room).emit('playerData', {
        room: player.room,
        players: getPlayersInRoom(player.room),
      });
    }

    const teams = addMember({
      teamID: data.joinTeamID,
      userID: socket.id,
      name: data.name,
    });
    console.log('teams new member', teams[0].members[0]);
    io.to(data.room).emit('message', {
      user: 'admin',
      text: `${data.name} has joined ${teams[data.joinTeamID - 1].teamName}`,
    });
    io.to(data.room).emit('teams', { teams });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    const player = removePlayer(socket.id);
    const member = removeMember(socket.id);
    console.log(`${user.name} has disconnected`);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      if (player) {
        io.to(player.room).emit('playerData', {
          room: player.room,
          players: getPlayersInRoom(player.room),
        });
      }
      if (member) {
        io.to(member.room).emit('teams', {
          teams: getTeams(member.room),
        });
      }
    }
  });
});

//app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
