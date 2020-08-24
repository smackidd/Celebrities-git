import React, { Component } from "react";
import RoomTeam from "./room-team.component";
import RoomPlayers from "./room-players.component";

class RoomTeams extends Component {
  state = {
    teams: [
      {
        id: 1,
        totalScore: 0,
        teamName: "",
        members: [
          { userID: "1", user: "Steve" },
          { userID: "2", user: "Kat" },
        ],
      },
      {
        id: 2,
        totalScore: 0,
        teamName: "",
        members: [
          { userID: "3", user: "Rob" },
          { userID: "4", user: "Barry" },
        ],
      },
      {
        id: 3,
        totalScore: 0,
        teamName: "",
        members: [
          { userID: "5", user: "Sean" },
          { userID: "6", user: "Anyssa" },
        ],
      },
      {
        id: 4,
        totalScore: 0,
        teamName: "",
        members: [
          { userID: "7", user: "Jen" },
          { userID: "8", user: "Stacy" },
          { user: "Baxter" },
        ],
      },
    ],
  };
  render() {
    return (
      <div id="team-bar">
        {this.state.teams.map((team) => (
          <RoomTeam key={team.id} team={team} />
        ))}
        <RoomPlayers onPlayers={this.props.players} />
      </div>
    );
  }
}

export default RoomTeams;
