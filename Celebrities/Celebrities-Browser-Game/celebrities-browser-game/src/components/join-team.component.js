import React, { useState, useEffect } from 'react';

const JoinTeam = ({ teams, joinTeam, onJoinTeam, onJoined, onJoinTeamID }) => {
  const [teamID, selectedTeamID] = useState('');

  useEffect(() => {
    console.log('teamID', teamID);
    onJoinTeamID(teamID);
  }, [onJoinTeamID, teamID]);

  return (
    <div>
      {joinTeam && (
        <div className='input-card'>
          <form>
            <h2>Join Team</h2>
            <div>
              <label htmlFor='joinTeam'>Join A Team</label>
              <select
                id='joinTeam'
                name='joinTeam'
                value={teamID}
                onChange={(event) => selectedTeamID(event.target.value)}
              >
                <option key='0' value='null'>
                  -- Select a Team --
                </option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.teamName}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div>
              {/* grab the e.target.value, preventDefault */}
              <button type='submit' onClick={(event) => onJoined(event)}>
                Accept
              </button>

              <button onClick={onJoinTeam}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default JoinTeam;
