import React from 'react';

const PlayersRemaining = ({ mode, onPlayersRemaining }) => {
  return (
    <div>
      {mode === 'playersRemaining' && (
        <p>Waiting for {onPlayersRemaining()} players...</p>
      )}
    </div>
  );
};

export default PlayersRemaining;
