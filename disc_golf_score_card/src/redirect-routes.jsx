import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class RedirectRoutes extends Component {
    componentDidMount = () =>{
        this.props.actions.unsetRedirect();
    }

    render(){
        return (
            <div>
                <Redirect to="/app" />
            </div>        
        );  
    }
}
