import React, { Component } from "react";
import Post from "./Post";
import { api } from "../App";

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: props.posts };
  }

//   async componentDidUpdate(prevProps, prevState) {
//     if (prevState.shouldRender !== this.state.shouldRender) {
//       const posts = await api.getPosts();
//       this.setState({ posts: posts, shouldRender: false });
//     }
//   }

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
    const newPosts = this.state.posts.filter(post => post.id !== postId);
     this.setState({ posts:newPosts });

     //deletePost of api does not work - req.body is falsely {} 
     api.deletePost(postId);
     this.props.handlePost();
     window.location.reload();
  };

  renderPosts = () => {
    return (
      <ul className="posts">
        {this.state.posts.map(post => (
          <li key={post.id} className="post">
            <Post post={post} onDelete={this.handleDelete} />
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
