/* jshint esversion:6 */
/* jshint moz: true */

import React, { Component } from 'react';
import  { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as reactBootstrap from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


import AddGame from './add-game.jsx';
import AddPlayer from './add-player';

export default class StartPage extends Component {
    render(){
        return (
            <div>
                <reactBootstrap.Grid>
                    <reactBootstrap.Row>
                        <reactBootstrap.Col xs={12} sm={6} md={4} lg={3}>
                            <reactBootstrap.PageHeader>
                                Start Page
                            </reactBootstrap.PageHeader>
                            <reactBootstrap.Well>
                                <reactBootstrap.Row>
                                    <reactBootstrap.Col md={6}>                                   
                                        <LinkContainer to={`${this.props.match.url}/add-game`}>
                                            <reactBootstrap.Button block>
                                                Start New Game
                                            </reactBootstrap.Button>
                                        </LinkContainer>
                                    </reactBootstrap.Col>
                                    <reactBootstrap.Col md={6}>
                                        <LinkContainer to={`${this.props.match.url}/add-player`}>
                                            <reactBootstrap.Button block>
                                                Add New Player
                                            </reactBootstrap.Button>        
                                        </LinkContainer>                                                    
                                    </reactBootstrap.Col>
                                </reactBootstrap.Row>
                            </reactBootstrap.Well>
                            <Route path={`${this.props.match.url}/add-game`} component={AddGame} />
                            <Route path={`${this.props.match.url}/add-player`} component={AddPlayer} />
                        </reactBootstrap.Col>
                    </reactBootstrap.Row>
                </reactBootstrap.Grid>                
            </div>
        );
    }
}