import React, { Component } from "react";
import "./App.scss";
import { createApiClient } from "./api.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import PostContainer from "./components/postContainer";
import FormPopup from "./components/FormPopup";

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
      searchTerm:''
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

  handleReRender = () => {
    this.setState({ shouldRender: true });
  };

  searchChange = (e) => {
    this.setState({searchTerm: e.target.value})
  }


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
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchChange}/>
            <Button variant="outline-info">Search</Button>
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
        <PostContainer posts={posts} handleReRender={this.handleReRender} searchTerm={this.state.searchTerm} />
      </main>
    );
  }
}

export default App;
