import React from 'react';

class Profile extends React.Component{
    constructor(props) {
        super(props);
        // initialization code here
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    render () {
        return (
            <header>
                <img className="pic" src={this.props.user.thumb_url}></img>
                <h1>{this.props.user.username }</h1>
            </header>
        );
    }
}

export default Profile;