import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import * as reactBS from 'react-bootstrap';

import AddPlayer from './add-player.jsx';
import AddFrisbee from './add-frisbee.jsx';
import AddGameMain from './add-game-main.jsx';
import ListGames from './list-games.jsx';
import ListPlayer from './list-player.jsx';
import StartPage from './start-page.jsx';


export default class AppRoutes extends Component {
    constructor(...args){
        super(...args);
        this.state = {
            props: args
        };
    }
    render(){
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <LinkContainer to="/">
                                <reactBS.Button>
                                    start
                                </reactBS.Button>
                            </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/add-player">
                            <reactBS.Button>
                                add new player
                            </reactBS.Button>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/add-frisbee">
                            <reactBS.Button>
                                add new frisbee
                            </reactBS.Button>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/add-game">
                            <reactBS.Button>
                                new game
                            </reactBS.Button>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/list-game">
                            <reactBS.Button>
                                game history
                            </reactBS.Button>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/list-player">
                            <reactBS.Button>
                                show users
                            </reactBS.Button>
                        </LinkContainer>
                        </li>
                    </ul>
                    <hr />
                    <Route exact path="/" component={StartPage} />
                    <Route path="/add-player" component={AddPlayer} />
                    <Route path="/add-frisbee" component={AddFrisbee} />
                    <Route path="/add-game" component={AddGameMain} />
                    <Route path="/list-game" component={ListGames} />
                    <Route path="/list-player" component={ListPlayer} />
                </div>
            </Router>
        );
    }
}