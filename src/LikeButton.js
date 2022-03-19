import React from 'react';
import {getHeaders} from './utils';
import {getCookie} from './utils';

class LikeButton extends React.Component {  

    constructor(props) {
        super(props);
        this.toggleLike = this.toggleLike.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
    }

    toggleLike(ev) {
        console.log('toggling');
        if (this.props.likeId) {
            this.unlike();
        } else {
            this.like();
        }
    }

    like() {
        const postData = {};
        fetch(`https://photo-app-gbburleigh.herokuapp.com/api/posts/${this.props.postId}/likes/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCookie('csrf_access_token')
                },
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                this.props.requeryPost();
            });
    }

    unlike() {
        fetch('https://photo-app-gbburleigh.herokuapp.com/api/profile')
        .then(response => response.json())
        .then(user => {
            fetch(`https://photo-app-gbburleigh.herokuapp.com/api/posts/${this.props.postId}/likes/${user.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCookie('csrf_access_token')
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.props.requeryPost();
            });
        })
    }

    render () {
        const likeId = this.props.likeId;
        return (
            <button role="switch"
                className="like" 
                aria-label="Like Button" 
                aria-checked={likeId ? true : false}
                onClick={this.toggleLike}>
                <i className={likeId ? 'fas fa-heart' : 'far fa-heart'}></i>                        
            </button>
        ) 
    }
}

export default LikeButton;