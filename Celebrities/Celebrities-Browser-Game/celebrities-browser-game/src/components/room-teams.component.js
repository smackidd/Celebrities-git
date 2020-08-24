import React, { useState } from 'react';
import RoomTeam from './room-team.component';
import RoomPlayers from './room-players.component';

const RoomTeams = ({ players, teams }) => {
  console.log('teams', teams);
  return (
    <div id='team-bar'>
      {teams.map((team) => (
        <RoomTeam team={team} />
      ))}
      <RoomPlayers players={players} />
    </div>
  );
};

export default RoomTeams;
