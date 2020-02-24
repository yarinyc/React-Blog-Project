import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { gen, api } from "../App";

class FormPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", show: false };
  }

  handleTitle = e => {
    const value = e.target.value;
    this.setState(state => ({ title: value }));
  };

  handleContent = e => {
    const value = e.target.value;
    this.setState(state => ({ content: value }));
  };

  handleClose = () => this.setState(state => ({ show: false }));

  handleShow = () => this.setState(state => ({ show: true }));

  handleSubmit = e => {
    e.preventDefault();
    const { title, content } = this.state;
    if (title === "" || content === "") {
      alert("Title and content should not be empty");
      return;
    }

    const newPost = {
      id: gen.next().value,
      title: title,
      content: content,
      by: this.props.userName,
      likes: 0,
      likedBy: []
    };

    api
      .addPost(newPost)
      .then(res => {
        if (res.message === "success") {
          this.props.handlePost();
          this.handleClose();
        }
      })
  };

  render() {
    return (
      <>
        <Button
          variant="outline-info"
          className="post-button"
          onClick={this.handleShow}
        >
          Post
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>What's on your mind?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="formPopup">
              <Form.Group controlId="postTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  onChange={this.handleTitle}
                  placeholder="Title"
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  onChange={this.handleContent}
                  placeholder="Enter your content here"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Send Post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default FormPopup;
