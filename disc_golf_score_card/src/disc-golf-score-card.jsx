/* jshint esversion: 6 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import * as axios from 'axios';

import { Button, Grid, Row, Col, PageHeader } from 'react-bootstrap';
import PlayerPage from './components/player/player-page';
import CoursePage from './components/course/course-page';
import CurrentGameList from './components/game/current-game-list';
import StartGamePage from './components/game/start-game';
import SelectCourse from './components/course/select-course';
import CurrentGamePage from './components/game/current-game-page';
import { ReduxAsyncConnect, asyncConnect } from 'redux-async-connect';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';

import { history } from './store/configureStore';

class NewStartPage extends Component {
    render(){
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} mdOffset={3} lgOffset={3}>
                        <PageHeader>Disc Golf Score Card</PageHeader>
                        <LinkContainer to='/app/new-game'>
                            <Button block bsSize="lg" bsStyle="primary">Start Game</Button> 
                        </LinkContainer>
                        <LinkContainer to="/app/game-list">
                            <Button bsSize="lg" block bsStyle="primary">Game History</Button> 
                        </LinkContainer>
                        <LinkContainer to="/app/players">
                            <Button bsSize="lg" block bsStyle="primary">Players</Button> 
                        </LinkContainer>
                        <LinkContainer to="/app/course">
                            <Button bsSize="lg" block bsStyle="primary">Courses</Button>                         
                        </LinkContainer>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

class DisGolfScoreCardApp extends Component{
    componentWillMount = () =>{
        console.log(this, this.props, this.props.actions);

        this.props.actions.loadCourses();        
        this.props.actions.loadPlayers().then(res =>{
            console.log(res);
            this.props.actions.loadPlayerNameColors(res);        
        });
    }
    handleCourseSelect = (course) =>{
        this.props.actions.selectCourse(course);
        alert("selected ", course);
    }
    handlePlayerSelect = (player) => {
        this.props.actions.selectPlayer(player);
        this.props.actions.togglePlayerNameColor(player);
    }
    render(){
        let courses = this.props.courses;
        let players = this.props.players;
        let gameData = this.props.gameData;
        const old_players = [
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
        console.log("COURSES!! ", courses);
        const renderWithRedux = (props) => (
            <ReduxAsyncConnect {...props} helpers="" filter={item => !item.deferred} />
        );
        return (
            <Router history={history} render={renderWithRedux}>
                <div>
                    <Route path="/app/players" component={PlayerPage} />
                    <Route path="/app/course" component={props =>(
                        <CoursePage 
                            handleAddCourse={this.handleAddCourse} 
                            courses={courses} {...props}/>
                    )} />
                    <Route path="/app/game-list" component={props => (
                        <CurrentGameList game={333} players={old_players} course={course} {...props} />
                    )} /> 
                    <Route path='/app/new-game' component={props =>(
                          <StartGamePage 
                                    handlePlayerSelect={this.handlePlayerSelect} 
                                    players={this.props.players} 
                                    //values={this.state.values} 
                                    gameData={gameData}
                                    playerNameColor={this.props.playerNameColor} 
                                    {...props} 
                          />
                    )} />
                    <Route 
                        path='/app/select-course' component={props =>(
                            <SelectCourse                                
                                handleCourseSelect={this.handleCourseSelect} 
                                courses={courses} 
                                addSelect 
                                gameData={gameData}
                                players={gameData.players} 
                                {...props} 
                            />
                        )} 
                    />
                    <Route 
                        path='/app/current-game' component={props =>(
                            <CurrentGamePage 
                                gameData={this.props.gameData} 
                                players={this.props.players} 
                                updateScore={this.props.actions.updateScore}
                                changePlayer={this.props.actions.changePlayer}
                                {...props} 
                            />
                        )} 
                    />
                    <Route path="/app" exact component={NewStartPage} /> 
                    {/*  <Route path="/" exact>
                            <Redirect path="/app"/>
                    </Route>                                  */}
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state){
    console.log(state); 
    return {
        //player: state.player,
        players: state.players,
        courses: state.courses,
        playerNameColor: state.playerNameColor,
        gameData: state.gameData,
    };
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DisGolfScoreCardApp);
