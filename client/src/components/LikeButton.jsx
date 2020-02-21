import React, { Component } from "react";
import { Button } from "react-bootstrap";
class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { likes: 0, updated: false };
  }

  handleLike = () => {
    if (this.state.updated) return;
    const newLikes = this.state.likes + 1;
    this.setState(state => ({ likes: newLikes, updated: true }));
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
          </span>{" "}
          {likes}
        </Button>
      </div>
    );
  }
}

export default LikeButton;
