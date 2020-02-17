
import Popup from "reactjs-popup";
import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import {gen, api} from "../App";


class FormPopup extends Component {
    constructor(props) {
        super(props);
        this.state = { title:"", content:"" }
    }

    
handleTitle = (e) => {
  const value = e.target.value;
  this.setState((state) => ({title: value}))
};

handleContent = (e) =>{
  const value = e.target.value;
  this.setState((state) => ({content: value}))
};

handleSubmit = (e) =>{
  e.preventDefault();
  const {title,content} = this.state;
  if(title === "" || content ==="") {
    alert("Title and content should not be empty")
    return;
  }

  const newPost = {
    id: gen.next().value,
    title: title,
    content: content
  }

  api.addPost(newPost);
  this.props.handlePost();
  window.location.reload();
}


render() {
  return ( 
    <Popup
        trigger={<button className="button"> Post </button>}
        modal
        closeOnDocumentClick
      >
      <Form className="formPopup" onSubmit={this.handleSubmit}>
        <Form.Group controlId="postTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="title" onChange={this.handleTitle} placeholder="Title" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows="5" onChange={this.handleContent} placeholder="Enter your content here"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Send Post
        </Button>
      </Form>
    </Popup>
    );
  } 
}

export default FormPopup;