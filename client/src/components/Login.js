import React, { Component } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
  };

  handleChange = (event) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value,
      },
    });
  };

  login = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then((results) => {
        localStorage.setItem("token", results.data.payload);
        this.props.history.push("/bubbles");
      })
      .catch((error) => {
        console.log("Error is: ", error);
      });
  };

  render() {
    return (
      <div className="login-page">
        <h1>Login to continue</h1>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button className="button">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
