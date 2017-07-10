/* jshint esversion: 6 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

import { Button, Grid, Row, Col, PageHeader } from 'react-bootstrap';
import PlayerPage from './components/player/player-page';
import CoursePage from './components/course/course-page';

class NewStartPage extends Component {
    render(){
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} mdOffset={3} lgOffset={3}>
                        <PageHeader>Disc Golf Score Card</PageHeader>
                        <Button block bsStyle="primary">Start Game</Button> 
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
        return (
            <Router>
                <div>
                    <Route path="/app" exact component={NewStartPage} />
                    <Route path="/app/players" component={PlayerPage} />
                    <Route path="/app/course" component={CoursePage} />
                    <Route path="/" exact render={() => (
                            (<Redirect path="/app"/>)
                        )}
                    />
                </div>
            </Router>
        );
    }
}
render(<DisGolfScoreCardApp />, document.getElementById('app'))