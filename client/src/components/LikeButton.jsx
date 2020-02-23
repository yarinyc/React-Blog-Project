import React, { Component } from "react";
import { Button } from "react-bootstrap";
class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes:
        localStorage.getItem(
          `likes.${this.props.userName}.${this.props.postId}`
        ) || 0
    };
  }

  handleLike = () => {
    if (this.state.likes === 1) return;
    this.setState(state => ({ likes: 1 }));
    localStorage.setItem(
      `likes.${this.props.userName}.${this.props.postId}`,
      1
    );
  };

  //   handleUnlike = () => {
  //     const newLikes = this.state.likes - 1;
  //     this.setState(state => ({ likes: newLikes }));
  //   };

  render() {
    const { likes } = this.state;
    return (
      <div>
        <Button
          className="likeButton"
          variant="primary"
          onClick={this.handleLike}
        >
          <span role="img" aria-label="heart">
            ❤️
          </span>
          {likes}
        </Button>
      </div>
    );
  }
}

export default LikeButton;

