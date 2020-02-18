import React, { Component } from "react";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { post: props.post };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.post !== state.post) {
      return {
        post: props.post
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  render() {
    const { post } = this.state;
    return (
      <React.Fragment>
        <div className="post">
          <h5 className="title">{post.title}</h5>
          <div className="content">{post.content}</div>
        </div>
        <button className="btn btn-sm m-2" onClick={() => this.props.onDelete(post.id)}>
          Delete Post
        </button>
      </React.Fragment>
    );
  }
}

export default Post;
