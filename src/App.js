import React from 'react';
import NavBar from './NavBar';
import Profile from './Profile';
import Stories from './Stories';
import Suggestions from './Suggestions';
import Posts from './Posts';
import {getHeaders} from './utils';
import {getCookie} from './utils';

class App extends React.Component { 

    constructor(props){
        super(props);
        this.state = {user: {}};
    }

    componentDidMount() {
        fetch(`https://photo-app-gbburleigh.herokuapp.com/api/profile/`, {
            method: "GET",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState({user: data})
        });
    }
    
    render () {
        return (
            <div>
                <NavBar title="Photo App" username={this.state.user['username']} />
                
                <aside>
                    <Profile user={this.state.user}/>
                    <Suggestions user={this.state.user}/>
                </aside>

                <main className="content">
                    <Stories />
                    <Posts />
                </main>

            </div>
        );
    }

}

export default App;