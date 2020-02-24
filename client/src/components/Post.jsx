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

    return (
      <React.Fragment>
        <div className="post">
          <h5 className="title">{post.title}</h5>
          <div className="content">{post.content}</div>
          <div className="buttons">
            {this.props.loggedIn && <div><LikeButton className="likeButton" userName={this.props.userName} post={post}/></div>}
            {this.props.loggedIn && this.props.admin && <button className="deleteBtn" onClick={() => this.props.onDelete(post.id)}>
              Delete Post
            </button>}
          </div>
        </div>
        <footer>
					<div className='meta-data'> By {post.by} | { new Date(post.id).toLocaleString()}</div>
				</footer>
      </React.Fragment>
    );
  }
}

export default Post;
