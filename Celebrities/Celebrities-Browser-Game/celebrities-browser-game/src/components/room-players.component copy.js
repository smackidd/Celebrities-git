import React, { Component } from "react";

class RoomPlayers extends Component {
  state = {};
  render() {
    return (
      <div className="team-container">
        <h2>Players</h2>
        <ul>
          {this.props.onPlayers.map((player) => (
            <li key={player.userID}>{player.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RoomPlayers;
