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
        let routesToComponents = {
            "/app/add-player": AddPlayer,
            "/add-frisbee": AddFrisbee,
            "/add-game": AddGameMain,
            "/list-game": ListGames,
            "/list-player": ListPlayer
        };
        let localRoutes = Object.keys(routesToComponents).map((key) => {
            return (
                <Route path={key} component={routesToComponents[key]} />
            );
        }).concat([
            <Route path="/" component={StartPage} />,
            <Route path="/app" component={StartPage} />,
        ]);
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <LinkContainer to="/app">
                                <reactBS.Button>
                                    start
                                </reactBS.Button>
                            </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/app/add-player">
                            <reactBS.Button>
                                add new player
                            </reactBS.Button>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/app/add-frisbee">
                            <reactBS.Button>
                                add new frisbee
                            </reactBS.Button>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/app/add-game">
                            <reactBS.Button>
                                new game
                            </reactBS.Button>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/app/list-game">
                            <reactBS.Button>
                                game history
                            </reactBS.Button>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/app/list-player">
                            <reactBS.Button>
                                show users
                            </reactBS.Button>
                        </LinkContainer>
                        </li>
                    </ul>
                    <hr />                    
                    {localRoutes}
                    {/*
                    <Route path="/add-player" component={AddPlayer} />
                    <Route path="/add-frisbee" component={AddFrisbee} />
                    <Route path="/add-game" component={AddGameMain} />
                    <Route path="/list-game" component={ListGames} />
                    <Route path="/list-player" component={ListPlayer} />
                    */}
                </div>
            </Router>
        );
    }
}