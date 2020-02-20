import Popup from "reactjs-popup";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { api } from "../App";

class registerPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "" };
  }

  handleUserName = e => {
    const value = e.target.value;
    this.setState(state => ({ userName: value }));
  };

  handlePassword = e => {
    const value = e.target.value;
    this.setState(state => ({ password: value }));
  };

  handleRegister = e => {
    e.preventDefault();
    const { userName, password } = this.state;

    if (userName === "" || password === "") {
      alert("User name and password should not be empty");
      return;
    }

    const registerRequest = {
      userName: userName,
      password: password,
      loggedIn: false,
      admin: false
    };

    api.register(registerRequest).then(res => {
      if (res.message === "failed") {
        alert("Username already taken");
        window.location.reload();
        return;
      }
      alert("You can now log in");
      return;
    });
  };

  render() {
    return (
      <Popup
        trigger={<Button variant="outline-info" id="registerButton"> Register </Button>}
        modal
        closeOnDocumentClick
      >
        <Form className="registerPopup" onSubmit={this.handleRegister}>
          <Form.Group controlId="_userName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="username"
              onChange={this.handleUserName}
              placeholder="UserName"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={this.handlePassword}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Popup>
    );
  }
}

export default registerPopup;
