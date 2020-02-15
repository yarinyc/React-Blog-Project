import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

import './api.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav, Button,NavDropdown,Form,FormControl} from 'react-bootstrap';
import PostContainer from './components/postContainer';

// export const api = createApiClient();

class App extends Component {

  state = {
    posts: []
  };
  
  componentDidMount(){
    
  }

  renderPosts = (posts) => {
    return <div>our posts</div> ;
  }

//   <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//   <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//   <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//   <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//   <NavDropdown.Divider />
//   <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
// </NavDropdown>

  renderNavbar = () => {
    return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">My Blog</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">About</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>);
  }
  
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
    
  //   return body;
  // };
  
  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/world', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
    
  //   this.setState({ responseToPost: body });
  // };


  
render() {
  const {posts} = this.state;

    return (<main>
      <div> 
        {this.renderNavbar()}
      </div>
      <PostContainer
        posts = {posts}
      />
    </main>
      
    );
  }
}

export default App;
