import React from 'react';
import Toggle from './toggle.component';

const GameInfo = ({ players }) => {
  const playersRemaining = (players) => {
    const playersRemaining = 4 - players.length;

    if (playersRemaining === 0) {
      // toggle next message
    }
    return playersRemaining;
  };

  return <div>Waiting for {playersRemaining(players)} players...</div>;
};

export default GameInfo;
