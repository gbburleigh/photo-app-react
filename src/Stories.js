import React from 'react';
import {getHeaders} from './utils';
import {getCookie} from './utils';

class Stories extends React.Component{
    constructor(props) {
        super(props);
        this.state = {stories: []}
    }

    componentDidMount() {
        fetch("https://photo-app-gbburleigh.herokuapp.com/api/stories/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCookie('csrf_access_token')
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({stories: data});
        });
    }

     render () {
        return (
            <header className="stories">
                {
                    this.state.stories.map(story => {
                        return (
                            <div>
                                <img src={story.user.thumb_url} className="pic" alt="profile pic" />
                                <p>{story.user.username}</p>
                            </div>
                        )
                    })
                }    
            </header>  
        );   
    }
}

export default Stories;