import React from 'react';
import { getHeaders } from './utils';

class AddComment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {commentText: ''};
        this.handleChange = this.handleChange.bind(this)
        this.addComment = this.addComment.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.textInput = React.createRef();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addComment();
        }
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    addComment(){
        const data = {
            post_id: this.props.post.id,
            text: this.state.commentText
        }
        fetch('https://photo-app-gbburleigh.herokuapp.com/api/comments', {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            this.props.requeryPost();
            this.textInput.current.focus();
            this.setState({commentText: ''});
        })
    }

    handleChange(event){
        this.setState({commentText: event.target.value});
    }

    handleSubmit(event){
        
    }

    showMostRecentComment(){
        const comments = this.props.post.comments.length
        if (comments > 0){
            return (
                <section>
                    <strong>{this.props.post.comments[comments - 1].user.username}: </strong>
                    {this.props.post.comments[comments - 1].text}
                </section>
            )
        }
        else{
            <div>No comments yet</div>
        }
    }

    render () {
        return (
            <div>
                {this.showMostRecentComment()}
                <div className="comment-controls">
                    <div><input ref={this.textInput} className="comment-input" onKeyDown={this.handleKeyDown} text="comment" onChange={this.handleChange} onSubmit={this.handleSubmit} value={this.state.commentText}/></div>
                    <div><button onClick={this.addComment}>Post</button></div>
                </div>
            </div>
        );
    }
}

export default AddComment;