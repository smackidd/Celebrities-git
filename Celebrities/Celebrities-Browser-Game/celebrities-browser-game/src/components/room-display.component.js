import React, { Component } from 'react';
import CreateTeam from './create-team.component';
import JoinTeam from './join-team.component';

class RoomDisplay extends Component {
  state = {};
  render() {
    const {
      setTeamName,
      teamName,
      createTeam,
      onCreateTeam,
      onCreateTeamName,
      teams,
      joinTeam,
      onJoinTeam,
      onJoined,
      onJoinTeamID,
    } = this.props;
    return (
      <div id='display'>
        <CreateTeam
          teamName={teamName}
          setTeamName={setTeamName}
          createTeam={createTeam}
          onCreateTeam={onCreateTeam}
          onCreateTeamName={onCreateTeamName}
        />
        <JoinTeam
          teams={teams}
          joinTeam={joinTeam}
          onJoinTeam={onJoinTeam}
          onJoined={onJoined}
          onJoinTeamID={onJoinTeamID}
        />
      </div>
    );
  }
}

export default RoomDisplay;
