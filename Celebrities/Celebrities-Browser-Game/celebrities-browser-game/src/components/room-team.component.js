import React, { Component } from 'react';

class RoomTeam extends Component {
  state = {};
  render() {
    const { team } = this.props;
    let name;

    name = `Team #${team.id}`;
    if (team.teamName) {
      name = team.teamName;
    }
    console.log('team', team, 'name', name);

    return (
      <div className='team-container'>
        <h2>{name}</h2>
        <ul>
          {team.members.map((member) => (
            <li key={member.userID}>{member.user}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RoomTeam;
