import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import RoomChat from './room-chat.component';
import RoomTeams from './room-teams.component';
import RoomDisplay from './room-display.component';
import GameInfo from './room-game-info.component';
import axios from 'axios';
//import users from "../../socket/users";
//import users from "../../socket/users";

let socket;

const ENDPOINT = 'localhost:5002';

const Room = ({ location }) => {
  const [userID, setUserID] = useState('');
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [teamName, setTeamName] = useState('');
  const [team, sendTeam] = useState({});
  const [teams, setTeams] = useState([]);
  // this state turns on the CreateTeam card in the display
  const [createTeam, onCreateTeam] = useState(false);
  const [joinTeam, onJoinTeam] = useState(false);
  const [joinTeamID, onJoinTeamID] = useState('');

  useEffect(() => {
    // const path = location.pathname.split('/');
    // const roomname = path[2];
    // const userID = path[3];

    const { room, userID } = queryString.parse(location.search);

    setUserID(userID);
    setRoom(room);

    socket = io(ENDPOINT);

    axios
      .get(`http://localhost:5000/users/${userID}`, {
        headers: {
          // shouldn't token be received from local storage?
          'auth-token': `${userID}`,
        },
      })
      .then((res) => {
        //let players = [...this.state.players];
        //let newPlayer = { userID, username: res.data.username };
        //players.push(newPlayer);
        setName(res.data.username);

        socket.emit('join', { name: res.data.username, room }, () => {
          console.log('I am here too');
        });

        socket.on('roomData', ({ room, users }) => {
          console.log('I am here');
          setUsers(users);
        });

        socket.on('playerData', ({ room, players }) => {
          setPlayers(players);
        });

        //console.log("players", players);

        console.log('players', players);
      })
      .catch((err) => console.log(err));

    // socket.on('newTeams', ({ newTeam }) => {
    //   setTeams([...teams, newTeam]);
    // });

    return () => {
      console.log('disconnect');
      socket.emit('disconnect');
      // socket.on('roomData', ({ room, players }) => {
      //   console.log('I am here');
      //   setPlayers(players);
      // });

      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    console.log('setting teams', teams);

    socket.on('teams', ({ teams }) => {
      setTeams(teams);
    });
  }, [teams]);

  // function for sending messages
  const sendMessage = (e) => {
    e.preventDefault();

    console.log('message sending', message);
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  //turns on the CreateTeam card in display
  const onOffCreateTeam = () => {
    const offCreateTeam = !createTeam;
    onCreateTeam(offCreateTeam);
  };

  const onOffJoinTeam = () => {
    const offJoinTeam = !joinTeam;
    onJoinTeam(offJoinTeam);
  };

  const onJoined = (e) => {
    e.preventDefault();

    socket.emit('joinTeam', { joinTeamID, room, name });
    onOffJoinTeam();
  };

  //adds a team with a new name to the list of teams
  //
  //need to fix
  //need to add ability to delete a team
  //need to create a socket to update teams to other users
  const onCreateTeamName = (e) => {
    e.preventDefault();

    console.log('teamName', teamName);

    //setTeams([...teams, newTeam]);
    socket.emit('teams', { teamName, room, name });

    onOffCreateTeam();
    return;
  };

  return (
    <div id='game-container'>
      <div id='hud'>
        <RoomTeams players={players} teams={teams} />
        <RoomDisplay
          setTeamName={setTeamName}
          teamName={teamName}
          createTeam={createTeam}
          onCreateTeam={onOffCreateTeam}
          onCreateTeamName={onCreateTeamName}
          teams={teams}
          joinTeam={joinTeam}
          onJoinTeam={onOffJoinTeam}
          onJoined={onJoined}
          onJoinTeamID={onJoinTeamID}
        />
        <div id='chat-window'>
          <RoomChat
            message={message}
            messages={messages}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
      <div id='game-info'>
        <GameInfo
          players={players}
          users={users}
          onCreateTeam={onOffCreateTeam}
          onJoinTeam={onOffJoinTeam}
        />
      </div>
    </div>
  );
};

export default Room;
