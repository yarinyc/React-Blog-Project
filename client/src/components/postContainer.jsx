import React, { Component } from "react";
import Post from "./Post";
import { api } from "../App";

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: props.posts, shouldRender: false };
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

  renderPosts = (posts) => {

    return (
      <ul className="posts">
        {posts.map(post => (
          <li key={post.id} className="post">
            <Post post={post} onDelete={this.handleDelete} loggedIn={this.props.loggedIn} admin={this.props.admin} userName={this.props.userName} />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const {posts} = this.state;
    return <div>{posts.len !== 0 ? this.renderPosts(posts) : <h2>No posts...</h2>}</div>;
  }
}

export default PostContainer;
