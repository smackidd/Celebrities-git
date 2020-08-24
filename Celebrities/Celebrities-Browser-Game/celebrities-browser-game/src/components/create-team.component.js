import React from 'react';

const CreateTeam = ({
  setTeamName,
  teamName,
  createTeam,
  onCreateTeam,
  onCreateTeamName,
}) => {
  return (
    <div>
      {createTeam && (
        <div className='input-card'>
          <form>
            <h2>Create Team</h2>
            <input
              type='text'
              placeholder='Team Name'
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
            />
            <br />
            <div>
              {/* grab the e.target.value, preventDefault */}
              <button
                type='submit'
                onClick={(event) => onCreateTeamName(event)}
              >
                Create
              </button>
              <button>Default</button>
              <button onClick={onCreateTeam}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default CreateTeam;
