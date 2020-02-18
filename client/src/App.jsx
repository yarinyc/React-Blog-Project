import React, { Component } from "react";

//import logo from './logo.svg';

import "./App.scss";

//import './api.js';
import { createApiClient } from "./api.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import PostContainer from "./components/postContainer";
import FormPopup from "./components/FormPopup";

export const api = createApiClient();

function* idMaker() {
  var index = 4;
  while (true) yield index++;
}

export var gen = idMaker();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      shouldRender: false
    };
  }

  async componentDidMount() {
    const posts = await api.getPosts();
    this.setState({
      posts: posts
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.shouldRender !== this.state.shouldRender) {
      const newPosts = await api.getPosts();
      this.setState({ posts: newPosts, shouldRender: false });
    }
  }

  handlePost = () => {
    this.setState({ shouldRender: true });
  };


  renderNavbar = () => {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">My Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
          <FormPopup handlePost={this.handlePost} />
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  render() {
    const { posts } = this.state;
    //console.log(posts)
    return (
      <main>
        <div className="navbar">{this.renderNavbar()}</div>
        <PostContainer posts={posts}  handlePost={this.handlePost}/>
      </main>
    );
  }
}

export default App;
