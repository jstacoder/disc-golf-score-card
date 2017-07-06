/* jshint esversion:6 */
/* jshint moz: true */
/* jshint -W015 */

import React, { Component } from 'react';
import  { BrowserRouter as Router, Route } from 'react-router-dom';
import * as reactBS from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


import AddGame from './add-game.jsx';
import AddPlayer from './add-player';

/* jshint ignore:start */
export default class StartPage extends Component {
    
    render(){
        let url_prefix = this.props.match.url !== '' ? this.props.match.url : '/app';
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
                                        <LinkContainer to={`${url_prefix}/add-game`}>
                                            <reactBS.Button block>
                                                Start New Game
                                            </reactBS.Button>
                                        </LinkContainer>
                                    </reactBS.Col>
                                    <reactBS.Col md={6}>
                                        <LinkContainer to={`${url_prefix}/add-player`}>
                                            <reactBS.Button block>
                                                Add New Player
                                            </reactBS.Button>        
                                        </LinkContainer>                                                    
                                    </reactBS.Col>
                                </reactBS.Row>
                            </reactBS.Well>
                            <Route path={`${url_prefix}/add-game`} component={AddGame} />
                            <Route path={`${url_prefix}/add-player`} component={AddPlayer} />
                        </reactBS.Col>
                    </reactBS.Row>
                </reactBS.Grid>                
            </div>
        );
    }
}
/* jshint ignore:end */
