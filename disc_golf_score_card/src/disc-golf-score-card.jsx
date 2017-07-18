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
import TurnPage from './components/turn/turn-page';
//import { ReduxAsyncConnect, asyncConnect } from 'redux-async-connect';

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

function GameRoute({match}){
    return (
        <div>
            <PageHeader>Game #:{match.params.game_id}</PageHeader>
        </div>
    );
}

export default class DisGolfScoreCardRoutes extends Component{
    isPlayerSelected = (player) =>{
        return this.props.gameData.players.indexOf(player) > -1;
    }
    componentWillMount = () =>{        
        this.props.actions.loadCourses();        
        this.props.actions.loadPlayers().then(res =>{            
            this.props.actions.loadPlayerNameColors(res);        
        });
    }
    handleCourseSelect = (course) =>{
        this.props.actions.selectCourse(course);
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
        
        return (
                <div>
                    <Route path="/app/players" component={PlayerPage} />
                    <Route path="/app/course" render={props =>(
                        <CoursePage 
                            handleAddCourse={this.handleAddCourse} 
                            courses={courses} {...props}/>
                    )} />
                    <Route path="/app/game-list" render={props => (
                        <CurrentGameList 
                            game={333} 
                            players={old_players} 
                            course={course} 
                            {...props} />
                    )} /> 
                    <Route path='/app/new-game' render={props =>(
                          <StartGamePage 
                                    handlePlayerSelect={this.handlePlayerSelect} 
                                    players={this.props.players} 
                                    //values={this.state.values} 
                                    gameData={gameData}
                                    isPlayerSelected={this.isPlayerSelected}
                                    playerNameColor={this.props.playerNameColor} 
                                    startNewGame={this.props.actions.startNewGame}
                                    {...props} 
                          />
                    )} />
                    <Route 
                        path='/app/select-course' render={props =>(
                            <SelectCourse                                
                                handleCourseSelect={this.handleCourseSelect} 
                                courses={courses} 
                                addSelect 
                                startNewGame={this.props.actions.startNewGame}
                                gameData={gameData}
                                players={gameData.players} 
                                {...props} 
                            />
                        )} 
                    />
                    <Route 
                        path='/app/current-game' render={props =>(
                            <CurrentGamePage 
                                gameData={this.props.gameData} 
                                players={this.props.players} 
                                updateScore={this.props.actions.updateScore}
                                changePlayer={this.props.actions.changePlayer}
                                currentTurn={this.props.currentTurn}
                                setRedirect={this.props.actions.setRedirect}
                                changeHole={this.props.actions.changeHole}
                                startNewGame={this.props.actions.startNewGame}
                                {...props} 
                            />
                        )} 
                    >                        
                    </Route>
                    <Route
                        path='/app/turn/:turn' render={props=>(
                            <TurnPage
                                incrementCount={this.props.actions.incrementCount}
                                decrementCount={this.props.actions.decrementCount}
                                resetCount={this.props.actions.resetCount}                                
                                gameData={this.props.gameData}
                                updateScore={this.props.actions.updateScore}
                                currentTurn={this.props.currentTurn}
                                changeHole={this.props.actions.changeHole}
                                changePlayer={this.props.actions.changePlayer}
                                setGameStart={this.props.actions.setGameStart}
                                addNewHoleScore={this.props.actions.addNewHoleScore}
                                updateTotal={this.props.actions.updateTotal}
                                totals={this.props.players.totalScores}
                             />
                        )}
                    />
                    <Route path="/app/game">
                        <Route path="/app/game/:game_id" component={GameRoute}/>                                                    
                    </Route>
                    <Route path="/app" exact component={NewStartPage} />                     
                </div>
        );
    }
}

