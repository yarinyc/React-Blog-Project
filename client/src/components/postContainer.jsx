import React, { Component } from "react";
import Post from "./Post";
import { api } from "../App";

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: props.posts };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.posts !== state.posts) {
      return {
        posts: props.posts
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  handleDelete = postId => {
    api.deletePost(postId);
    this.props.handleReRender();
  };

  renderPosts = () => {
    return (
      <ul className="posts">
        {this.state.posts.map(post => (
          <li key={post.id} className="post">
            <Post post={post} onDelete={this.handleDelete} loggedIn={this.props.loggedIn} admin={this.props.admin} />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const len = this.state.posts.length;
    return <div>{len !== 0 ? this.renderPosts() : <h2>Loading...</h2>}</div>;
  }
}

export default PostContainer;
