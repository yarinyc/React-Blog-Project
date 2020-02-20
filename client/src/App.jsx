import React, { Component } from "react";
import "./App.scss";
import { createApiClient } from "./api.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import PostContainer from "./components/postContainer";
import FormPopup from "./components/FormPopup";
import LoginPopup from "./components/LoginPopUp";
import RegisterPopup from "./components/registerPopUp";

export const api = createApiClient();

function* idMaker() {
  while (true) yield Date.now();
}

export var gen = idMaker();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      shouldRender: false,
      userName: "",
      loggedIn: false,
      admin: false,
      searchTerm: ""
    };
  }

  async componentDidMount() {
    const posts = await api.getPosts();
    const meta = await api.getInit();
    this.setState({
      posts: posts,
      loggedIn: meta.loggedIn,
      admin: meta.admin
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.shouldRender !== this.state.shouldRender) {
      const newPosts = await api.getPosts();
      this.setState(state => ({ posts: newPosts, shouldRender: false }));
    }
  }

  handlePost = () => {
    this.setState(state => ({ shouldRender: true }));
  };

  handleLogin = (admin, userName) => {
    this.setState(state => ({
      loggedIn: true,
      admin: admin,
      userName: userName
    }));
  };

  handleLogout = () => {
    api.logout(this.state.userName);
    this.setState(state => ({ loggedIn: false, admin: false, userName: "" }));
  };

  handleReRender = () => {
    this.setState(state => ({ shouldRender: true }));
  };

  searchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  renderButtons = (loggedIn, admin) => {
    if (loggedIn) if (admin) return <FormPopup handlePost={this.handlePost} />;

    if (!loggedIn) return <LoginPopup handleLogin={this.handleLogin} />;
    return null;
  };

  renderNavbar = () => {
    const { loggedIn, admin } = this.state;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home" id="brand">
          My Blog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#about" id="aboutLink">
              About
            </Nav.Link>
            {!this.state.loggedIn && <RegisterPopup />}
          </Nav>
          {this.state.loggedIn && (
            <Button
              variant="outline-info"
              id="logoutButton"
              onClick={this.handleLogout}
            >
              Log out
            </Button>
          )}
          {this.renderButtons(loggedIn, admin)}
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={this.searchChange}
            />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  render() {
    const { posts, loggedIn, admin } = this.state;
    return (
      <main>
        <div className="navbar">{this.renderNavbar()}</div>
        <PostContainer
          posts={posts}
          handlePost={this.handlePost}
          handleReRender={this.handleReRender}
          loggedIn={loggedIn}
          admin={admin}
          searchTerm={this.state.searchTerm}
        />
      </main>
    );
  }
}

export default App;
