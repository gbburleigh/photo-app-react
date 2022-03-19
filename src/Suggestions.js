import React from 'react';
import { getCookie, getHeaders } from './utils';
import Suggestion from './Suggestion';

class Suggestions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {suggestions: []}
        this.requerySuggestion = this.requerySuggestion.bind(this)
    }

    componentDidMount() {
        fetch(`https://photo-app-gbburleigh.herokuapp.com/api/suggestions/`, {
            method: "GET",
            headers: getHeaders(),
        })
        .then(response => response.json())
        .then(data => {
            var d = []
            if (data.length > 0){
                for (const elem of data){
                    if (elem.username != this.props.user.username){
                        d.push(elem)
                    }
                }
                this.setState({suggestions: d})
            }
        });
    }

    requerySuggestion() {
        fetch(`https://photo-app-gbburleigh.herokuapp.com/api/suggestions/`, {
            method: "GET",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            var d = []
            for (const elem of data){
                if (elem.username != this.props.user.username){
                    d.push(elem)
                }
            }
            this.setState({suggestions: d})
        });
    }

     render () {
        return (
        <div className="suggestions">
            <p className="suggestion-text">Suggestions for you</p>
            {
                this.state.suggestions.map(suggestion => {
                    return(
                        <Suggestion suggestion={suggestion} 
                                    userId={suggestion.id}
                                    aria-label="Follow Button"
                                    requerySuggestion={this.requerySuggestion}
                                    followed={false}/>
                    )
                })
            }
        </div>
        )
    }
}

export default Suggestions;