import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      token: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    // axios.post('http://localhost:5000/users/login', user)
    axios.post("/users/login", user).then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.data);
      window.location = "/room-login";
    });
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
              <h2>Sign In</h2>
              <input
                id="username-input"
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
              <input
                id="password-input"
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
            <div id="register-here">
              <p>
                Not registered yet? <Link to="/register">Register here!</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
