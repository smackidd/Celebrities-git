let players = [];

const addPlayer = ({ id, name, room }) => {
  const player = { id, name, room };
  players.push(player);
  return { player };
};

const removePlayer = ({ id }) => {
  const index = players.findIndex((player) => player.id === id);

  if (index !== -1) {
    return players.splice(index, 1)[0];
  }
};

const getPlayer = (id) => {
  return players.find((player) => player.id === id);
};

const getPlayersInRoom = (room) => {
  return players.filter((player) => player.room === room);
};

module.exports = { addPlayer, removePlayer, getPlayer, getPlayersInRoom };
