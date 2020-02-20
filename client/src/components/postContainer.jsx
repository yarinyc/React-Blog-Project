import React, { Component } from "react";
import Post from "./Post";
import { api } from "../App";

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: props.posts, search: props.searchTerm };
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

  handleSearch = (toSearch)=> {
    const { posts } = this.state;
    let filteredResults = [];
    toSearch === '' ? filteredResults=posts :
    filteredResults = posts.filter(post => post.title.toLowerCase().includes(toSearch.toLowerCase()) ||
                                        post.content.toLowerCase().includes(toSearch.toLowerCase()));
    return filteredResults;
  }

  renderPosts = (postsToRender) => {

    return (
      <ul className="posts">
        {postsToRender.map(post => (
          <li key={post.id} className="post">
            <Post post={post} onDelete={this.handleDelete} />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const filteredResults = this.handleSearch(this.props.searchTerm);
    return <div>{filteredResults.len !== 0 ? this.renderPosts(filteredResults) : <h2>Loading...</h2>}</div>;
  }
}

export default PostContainer;
