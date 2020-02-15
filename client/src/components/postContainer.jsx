import React, { Component } from 'react';
import Post from './Post'

class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: props.posts }
    }
    
    renderPosts = () =>{
        return (
            <ul className='posts'>
            {this.state.posts.map((post) =>
                <li key={post.id} className='post'>
                    <Post
                        id={post.id}
                        title={post.title}
                        content={post.content}
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