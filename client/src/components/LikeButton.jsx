import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { api } from "../App";

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName,
      postId: props.post.id,
      likes: props.post.likes,
      likedBy: props.post.likedBy
    };
  }

  handleLike = () => {
    const {likedBy, likes, userName, postId} = this.state;
    if(likedBy.includes(userName)){
      api.likePost(postId, userName, "unlike")
      .then( (res) => {
        this.setState({ likes: likes - 1 ,
                        likedBy: likedBy.filter( (e) => e !== userName)
                      });
      });
    }
    else{
      api.likePost(postId, userName, "like")
      .then( (res) => {
        this.setState({ likes: likes + 1 ,
                        likedBy: likedBy.concat(userName)
                      });
      });
    } 
  };

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

