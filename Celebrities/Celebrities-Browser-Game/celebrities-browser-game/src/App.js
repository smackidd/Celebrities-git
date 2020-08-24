/////
//
// TO DO:
// Fix user-register and room-register backend (JWT)
// Add catch at the onSubmit methods in user login and register
// add validation for illegal characters in register (no spaces)
// Socket IO - Players List, chat
// Menu Component buttons at the bottom
// Display Component
//
/////

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import UserLogin from './components/user-login.component';
import UserRegister from './components/user-register.component';
import RoomLogin from './components/room-login.component';
import RoomRegister from './components/room-register.component';
import Room from './components/room.component';

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <div className='container'>
          <br />
          <Route path='/' exact component={UserLogin} />
          <Route path='/register' component={UserRegister} />
          <Route path='/room-login' component={RoomLogin} />
          <Route path='/room-register' component={RoomRegister} />
          <Route path='/room' component={Room} />
        </div>
      </Router>
    );
  }
}

export default App;
