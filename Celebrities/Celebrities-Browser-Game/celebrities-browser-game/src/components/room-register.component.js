import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import axios from "axios";

export default class RoomRegister extends Component {
  constructor(props) {
    super(props);

    this.onChangeRoomname = this.onChangeRoomname.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCreateJoin = this.onChangeCreateJoin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      roomname: "",
      password: "",
    };
  }

  onChangeRoomname(e) {
    this.setState({
      roomname: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeCreateJoin() {
    window.location = "/room-login";
  }

  onSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const user = {
      roomname: this.state.roomname,
      password: this.state.password,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/rooms/add", user, {
        headers: {
          "auth-token": `${token}`,
        },
      })
      .then(
        (res) =>
          (window.location = `/room/${res.data.roomname}/${res.data.user}`)
      );

    //window.location = ('/room/')
  }

  render() {
    return (
      <div id="registration-box">
        <div id="registration-inner-box">
          <form onSubmit={this.onSubmit}>
            <div id="title-box">
              <h1>CELEBRITIES</h1>
            </div>
            <div id="registration-inputs">
              <h2>Create/Join A Game</h2>
              <label htmlFor="create-join"></label>
              <select
                name="create-join"
                className="create-join"
                onChange={this.onChangeCreateJoin}
              >
                <option value="create">Create A Game</option>
                <option value="join">Join A Game</option>
              </select>

              <input
                id="room-input"
                name="room"
                type="text"
                placeholder="Room Name"
                value={this.state.roomname}
                onChange={this.onChangeRoomname}
              />
              <input
                id="room-password"
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
            <div id="registration-buttons">
              <button type="reset" className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
