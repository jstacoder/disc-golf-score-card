/* jshint esversion: 6 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

import { Button, Grid, Row, Col, PageHeader } from 'react-bootstrap';
import PlayerPage from './components/player/player-page';
import CoursePage from './components/course/course-page';
import CurrentGameList from './components/game/current-game-list';
import StartGamePage from './components/game/start-game';

class NewStartPage extends Component {
    render(){
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} mdOffset={3} lgOffset={3}>
                        <PageHeader>Disc Golf Score Card</PageHeader>
                        <LinkContainer to='/app/new-game'>
                            <Button block bsStyle="primary">Start Game</Button> 
                        </LinkContainer>
                        <Button block bsStyle="primary">Game History</Button> 
                        <LinkContainer to="/app/players">
                            <Button block bsStyle="primary">Players</Button> 
                        </LinkContainer>
                        <LinkContainer to="/app/course">
                            <Button block bsStyle="primary">Courses</Button>                         
                        </LinkContainer>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

class DisGolfScoreCardApp extends Component{
    render(){
        const players = [
            {
                name: "kyle",                
                scores:[
                    3,3,3,4,2,0,0,0,0
                ]
            },
            {
                name: "joe",
                scores:[
                    3,3,3,4,2,0,0,0,0
                ]
            }
        ];        
        const course = {
            name: 'twila reid',
            holes: [1,2,3,4,5,6,7,8,9]
        };
        return (
            <Router>
                <div>
                    <Route path="/app" exact component={NewStartPage} />
                    <Route path="/app/players" component={PlayerPage} />
                    <Route path="/app/course" component={CoursePage} />
                    {/*<Route path="/app/new-game" component={props => (<CurrentGameList game={333} players={players} course={course} {...props} />)} */}
                    <Route path='/app/new-game' component={StartGamePage} />
                    <Route path="/" exact render={() => (
                            <Redirect path="/app"/>
                        )}
                    />
                </div>
            </Router>
        );
    }
}
render(<DisGolfScoreCardApp />, document.getElementById('app'))