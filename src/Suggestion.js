import React from 'react';
import { getCookie, getHeaders } from './utils';

class Suggestion extends React.Component{
    constructor(props) {
        super(props);
        this.toggleFollow = this.toggleFollow.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.state = {followed: false};
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    toggleFollow(ev){
        if (!this.state.followed){
            this.setState({followed: true});
            this.follow();
        }
        else{
            this.setState({followed: false});
            this.unfollow();
        }
    }

    follow(){
        const postData = {
            "user_id": this.props.userId
        };
        
        fetch("https://photo-app-gbburleigh.herokuapp.com/api/following/", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            //this.props.requerySuggestion();
        });
    }

    unfollow(){
        fetch(`https://photo-app-gbburleigh.herokuapp.com/api/following/${this.props.userId}`, {
            method: "DELETE",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            //this.props.requerySuggestion();
        });
    }

     render () {
        if (!this.state.followed){
            return(<div className="suggestion">
                <img alt="profile picture" src={this.props.suggestion.thumb_url}/>
                <div>
                    <p alt="username" className="username">{this.props.suggestion.username}</p>
                    <p className="suggestion-text" alt="suggestion text">suggested for you</p>
                </div>
                <div>
                    <button aria-label="Follow Button" aria-checked={this.state.followed} alt="follow-button" className="follow" data-user-id={this.props.suggestion.id} onClick={this.toggleFollow}><a>follow</a></button>
                </div>
            </div>
            )  
        }
        else{
            return(<div className="suggestion">
                <img alt="profile picture" src={this.props.suggestion.thumb_url}/>
                <div>
                    <p alt="username" className="username">{this.props.suggestion.username}</p>
                    <p className="suggestion-text" alt="suggestion text">suggested for you</p>
                </div>
                <div>
                    <button aria-label="Unfollow Button" aria-checked={this.state.followed} alt="follow-button" className="unfollow" data-user-id={this.props.suggestion.id} onClick={this.toggleFollow}><a>unfollow</a></button>
                </div>
            </div>
            )  
        }
    }
}

export default Suggestion;