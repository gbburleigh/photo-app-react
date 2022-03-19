import React from 'react';
import {getHeaders} from './utils';
import {getCookie} from './utils';

class BookmarkButton extends React.Component {  

    constructor(props) {
        super(props);
        this.toggleSave = this.toggleSave.bind(this);
        this.save = this.save.bind(this);
        this.unsave = this.unsave.bind(this);
    }

    toggleSave(ev) {
        if (this.props.saveId) {
            this.unsave();
        } else {
            this.save();
        }
    }

    save() {
        
        const postData = { 'post_id': this.props.postId };
        fetch(`https://photo-app-gbburleigh.herokuapp.com/api/bookmarks/`, {
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

    unsave() {
        fetch(`https://photo-app-gbburleigh.herokuapp.com/api/bookmarks/${this.props.saveId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCookie('csrf_access_token')
            }
        })
        .then(response => response.json())
        .then(data => {
            this.props.requeryPost();
        });
    }

    render () {
        const saveId = this.props.saveId;
        return (
            <button role="switch"
                className="bookmark" 
                aria-label="Bookmark Button" 
                aria-checked={saveId ? true : false}
                onClick={this.toggleSave}>
                <i className={saveId ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>                        
            </button>
        ) 
    }
}

export default BookmarkButton;