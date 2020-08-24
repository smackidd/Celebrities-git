import React, { Component } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import RoomChat from "./room-chat.component";
import RoomTeams from "./room-teams.component";
import RoomDisplay from "./room-display.component";
import axios from "axios";
//import users from "../../socket/users";
//import users from "../../socket/users";

let socket;
let players = [];
const ENDPOINT = "localhost:5002";

class Room extends Component {
  state = {
    roomname: "",
    userID: "",
    username: "",
    players: [],
  };

  outputPlayers = (players) => {
    console.log("players", players);
    this.setState(players);
  };

  componentDidMount() {
    const path = this.props.location.pathname.split("/");
    const roomname = path[2];
    const userID = path[3];

    socket = io(ENDPOINT);

    axios
      .get(`http://localhost:5000/users/${userID}`, {
        headers: {
          // shouldn't token be received from local storage?
          "auth-token": `${userID}`,
        },
      })
      .then((res) => {
        //let players = [...this.state.players];
        //let newPlayer = { userID, username: res.data.username };
        //players.push(newPlayer);
        console.log("res.data.username", res.data.username);
        socket.emit(
          "join",
          { name: res.data.username, room: roomname },
          () => {}
        );

        socket.on("roomData", ({ users }) => {
          this.outputPlayers(users);
        });

        //console.log("players", players);

        this.setState({
          roomname,
          userID,
          username: res.data.username,
        });
        console.log("state", this.state);
      })

      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div id="game-container">
        <div id="hud">
          <RoomTeams players={this.state.players} />
          <RoomDisplay />
          <div id="chat-window">
            <RoomChat />
          </div>
        </div>
        <div id="chat-input"></div>
      </div>
    );
  }
}

export default Room;
