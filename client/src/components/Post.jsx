import React, { Component } from 'react';
class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { id: props.id,
                    title: props.title,
                    content: props.content }
    }
    render() { 
        return ( <div></div> );
    }
}
 
export default Post;