/* jshint esversion:6 */
/* jshint moz: true */

import React, { Component } from 'react';
import  { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as reactBS from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


import AddGame from './add-game.jsx';
import AddPlayer from './add-player';

export default class StartPage extends Component {
    render(){
        return (
            <div>
                <reactBS.Grid>
                    <reactBS.Row>
                        <reactBS.Col xs={12} sm={6} md={4} lg={3}>
                            <reactBS.PageHeader>
                                Start Page
                            </reactBS.PageHeader>
                            <reactBS.Well>
                                <reactBS.Row>
                                    <reactBS.Col md={6}>                                   
                                        <LinkContainer to={`${this.props.match.url}/add-game`}>
                                            <reactBS.Button block>
                                                Start New Game
                                            </reactBS.Button>
                                        </LinkContainer>
                                    </reactBS.Col>
                                    <reactBS.Col md={6}>
                                        <LinkContainer to={`${this.props.match.url}/add-player`}>
                                            <reactBS.Button block>
                                                Add New Player
                                            </reactBS.Button>        
                                        </LinkContainer>                                                    
                                    </reactBS.Col>
                                </reactBS.Row>
                            </reactBS.Well>
                            <Route path={`${this.props.match.url}/add-game`} component={AddGame} />
                            <Route path={`${this.props.match.url}/add-player`} component={AddPlayer} />
                        </reactBS.Col>
                    </reactBS.Row>
                </reactBS.Grid>                
            </div>
        );
    }
}
