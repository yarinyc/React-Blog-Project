import React, { Component } from "react";
import "./App.scss";
import { createApiClient } from "./api.js";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Pagination
} from "react-bootstrap";
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
      searchTerm: "",
      pageNum: 0,
      postsPerPage: 5,
      leftPosts: 0
    };
  }

  searchDebounce = null;

  async componentDidMount() {
    const { posts, leftPosts} = await api.getPosts(
      this.state.searchTerm,
      this.state.pageNum,
      this.state.postsPerPage
    );
    const meta = await api.getInit();
    this.setState({
      posts: posts,
      leftPosts: leftPosts,
      loggedIn: meta.loggedIn,
      admin: meta.admin
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.shouldRender !== this.state.shouldRender) {
      const { posts, leftPosts} = await api.getPosts(
        this.state.searchTerm,
        this.state.pageNum,
        this.state.postsPerPage
      );
      this.setState(state => ({ posts: posts, leftPosts: leftPosts ,shouldRender: false }));
    }
  }

  handlePost = () => {
    this.setState(state => ({
      shouldRender: true
    }));
  };

  handleLogin = (admin, userName) => {
    this.setState(state => ({
      loggedIn: true,
      admin: admin,
      userName: userName
    }));
  };

  handleLogout = () => {
    api.logout(this.state.userName).then(res => {
      api
        .getPosts(
          this.state.searchTerm,
          this.state.pageNum,
          this.state.postsPerPage
        )
        .then(posts => {
          if (res.message === "success") {
            this.setState(state => ({
              posts: posts.posts,
              loggedIn: false,
              admin: false,
              userName: "",
              pageNum: this.state.pageNum,
              postsPerPage: this.state.postsPerPage,
              leftPosts: posts.leftPosts
            }));
          }
        });
    });
  };

  handleReRender = () => {
    this.setState(state => ({ shouldRender: true }));
  };

  prevPage = () => {
    if (this.state.pageNum > 0)
      this.setState(state => ({
        pageNum: this.state.pageNum - 1,
        shouldRender: true
      }));
  };

  nextPage = () => {
    if(this.state.leftPosts > 0)
      this.setState(state => ({
        pageNum: this.state.pageNum + 1,
        shouldRender: true
      }));
  };

  //search functionality:
  onSearch = async val => {
    clearTimeout(this.searchDebounce);

    this.searchDebounce = setTimeout(async () => {
      const { posts, leftPosts } = await api.getPosts(
        val,
        this.state.pageNum,
        this.state.postsPerPage
      );
      this.setState({
        posts: posts,
        leftPosts: leftPosts,
        searchTerm: val
      });
    }, 300);
  };

  renderButtons = (loggedIn, admin) => {
    if (loggedIn)
      if (admin)
        return (
          <FormPopup
            handlePost={this.handlePost}
            userName={this.state.userName}
          />
        );

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
          </Nav>
          {!this.state.loggedIn && <RegisterPopup />}
          {this.state.loggedIn && (
            <React.Fragment>
              <Navbar.Brand>Hello {this.state.userName}</Navbar.Brand>
              <Button
                variant="outline-info"
                id="logoutButton"
                onClick={this.handleLogout}
              >
                Log out
              </Button>
            </React.Fragment>
          )}
          {this.renderButtons(loggedIn, admin)}
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={e => this.onSearch(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  render() {
    const { posts, loggedIn, admin, userName, pageNum } = this.state;
    return (
      <main>
        <div className="navbar">{this.renderNavbar()}</div>
        <Pagination className="pagination">
          <Pagination.Prev onClick={this.prevPage} />
          <Pagination.Item>{pageNum + 1}</Pagination.Item>
          <Pagination.Next onClick={this.nextPage} />
        </Pagination>
        <PostContainer
          posts={posts}
          handlePost={this.handlePost}
          handleReRender={this.handleReRender}
          loggedIn={loggedIn}
          admin={admin}
          userName={userName}
        />
      </main>
    );
  }
}

export default App;
