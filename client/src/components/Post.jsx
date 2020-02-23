import React, { Component } from "react";
import LikeButton from './LikeButton';

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

    console.log(this.props.postId);

    return (
      <React.Fragment>
        <div className="post">
          <h5 className="title">{post.title}</h5>
          <div className="content">{post.content}</div>
          {this.props.loggedIn && <div><LikeButton className="likeButton" userName={this.props.userName} postId={this.props.postId}/></div>}
        </div>
        {this.props.loggedIn && this.props.admin && <button className="btn btn-sm m-2" id="deleteBtn" onClick={() => this.props.onDelete(post.id)}>
          Delete Post
        </button>}
      </React.Fragment>
    );
  }
}

export default Post;
