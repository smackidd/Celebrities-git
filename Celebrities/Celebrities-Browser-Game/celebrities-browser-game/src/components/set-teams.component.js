import React from 'react';

const SetTeams = ({ mode, players, users, onCreateTeam, onJoinTeam }) => {
  return (
    <div>
      {mode === 'setTeams' && (
        <React.Fragment>
          <p>{users.length} players have joined</p>
          <div className='teamButtons'>
            <button onClick={onCreateTeam}>Create Team</button>
            <button onClick={onJoinTeam}>Join Team</button>
            <button>Auto Assign</button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SetTeams;
