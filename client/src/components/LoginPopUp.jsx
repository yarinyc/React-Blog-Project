import Popup from "reactjs-popup";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { api } from "../App";

class LoginPopup extends Component {
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

  handleSubmit = e => {
    e.preventDefault();
    const { userName, password } = this.state;
    if (userName === "" || password === "") {
      alert("User name and password should not be empty");
      return;
    }

    const logInRequest = {
      userName: userName,
      password: password
    };

    api.login(logInRequest).then(res => {
      if (res.message === "failed") {
        window.location.reload();
        return;
      }
      this.props.handleLogin(res.admin === "true", userName);
    });
  };

  render() {
    return (
      <Popup
        trigger={<Button variant="outline-info" id="loginButton"> Login </Button>}
        modal
        closeOnDocumentClick
      >
        <Form className="loginPopup" onSubmit={this.handleSubmit}>
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
            Log in
          </Button>
        </Form>
      </Popup>
    );
  }
}

export default LoginPopup;
