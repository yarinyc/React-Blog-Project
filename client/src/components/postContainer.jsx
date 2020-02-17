import React, { Component } from 'react';
import Post from './Post'

class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: props.posts }
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
    
    renderPosts = () =>{
        return (
            <ul className='posts'>
            {this.state.posts.map((post) =>
                <li key={post.id} className='post'>
                    <Post
                        post = {post}
                    />
                </li>)
            }
        </ul>
        );
    }

    render() { 
        const len = this.state.posts.length;
        return (
            <div>
                {len !== 0 ? this.renderPosts() : <h2>Loading...</h2> }
            </div>
        
        );
    }
}
 
export default PostContainer;