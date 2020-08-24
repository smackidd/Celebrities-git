import React, { useState } from 'react';
//import Toggle from './toggle.component';
import PlayersRemaining from './players-remaining.component';
import SetTeams from './set-teams.component';

const GameInfo = ({ players, onCreateTeam, onJoinTeam }) => {
  const [mode, changeMode] = useState('playersRemaining');

  const playersRemaining = () => {
    const playersRemaining = 4 - players.length;

    if (playersRemaining === 0) {
      return changeMode('setTeams');
    }
    return playersRemaining;
  };

  return (
    <React.Fragment>
      <PlayersRemaining mode={mode} onPlayersRemaining={playersRemaining} />
      <SetTeams
        mode={mode}
        players={players}
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
      />
    </React.Fragment>
  );

  // if (mode === 'setTeams') {
  //   return (
  //     <Toggle
  //       display={({ off, toggle }) => (
  //         <div>
  //           {off && (
  //             <React.Fragment>
  //               <p>{players} players have joined</p>
  //               <div className='teamButtons'>
  //                 <button>Create Team</button>
  //                 <button>Join Team</button>
  //                 <button>Auto Assign</button>
  //               </div>
  //             </React.Fragment>
  //           )}
  //         </div>
  //       )}
  //     />
  //   );
  // }
};

export default GameInfo;
