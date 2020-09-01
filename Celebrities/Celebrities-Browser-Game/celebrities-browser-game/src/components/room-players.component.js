import React from 'react';

const RoomPlayers = ({ players }) => {
  console.log(players);
  return (
    <div className='team-container'>
      <h2>Players</h2>
      <ul>
        {players.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomPlayers;
