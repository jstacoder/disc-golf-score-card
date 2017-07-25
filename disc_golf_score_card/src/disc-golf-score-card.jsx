/* jshint esversion: 6 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import * as axios from 'axios';

import { Button, Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap';
import PlayerPage from './components/player/player-page';
import CoursePage from './components/course/course-page';
import CurrentGameList from './components/game/current-game-list';
import StartGamePage from './components/game/start-game';
import SelectCourse from './components/course/select-course';
import CurrentGamePage from './components/game/current-game-page';
import TurnPage from './components/turn/turn-page';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';

import { history } from './store/configureStore';

class GameHistory extends Component{    
    componentWillMount = () =>{
        this.props.loadHistory();
    }
    render(){
        let game, playerHistorys;
        const history = this.props.history.map((itm)=>{
            [game, playerHistorys] = itm;
            console.log("PLAYER HIST: ",playerHistorys);
            let rtn = [
                <p>{game.date} - {game.course}</p>
            ];
            let gamePlayerScores = {};
            const gamePlayers = playerHistorys.map(itm =>{
                const name = Object.keys(itm)[0];
                gamePlayerScores[name] = itm[name];
                return name;
            });
            
             rtn.push(
                    <table className="table table-condensed table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                            </tr>
                        </thead>
                        <tbody>
                                {gamePlayers.map(n =>(
                                    <tr>
                                        <td>{n}</td>
                                        {gamePlayerScores[n].map(row =>{                                            
                                            return(
                                                <td>{row.hole} - {row.value}</td>                                        
                                            );
                                        })}
                                    </tr>
                                ))}                                                            
                        </tbody>
                    </table>
            );
            
            // playerHistorys.map((current)=>{
            //     const playerNames = Object.keys(current);
            //     console.log("CURREENT:  ", current);
            //     console.log("PLAYER HIST:" , playerHistorys)
            //     console.log("GAME: ", game);
                
            //     rtn.push(
            //         <table className="table table-condensed table-hover table-bordered">
            //             <thead>
            //                 <tr>
            //                     {playerNames.map(name =>(
            //                         <th>{name}</th>
            //                     ))}
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                     {playerNames.map(name =>(
            //                         <tr>
            //                             {current[name].map(row =>(
            //                                 <td>{row.hole} - {row.value}</td>
            //                             ))}
            //                         </tr>
            //                     ))}
            //             </tbody>
            //         </table>
            //     )
            // });
            // playerHistorys.map((o)=>{
            //     console.log(o[Object.keys(o)[0]]);
            //     console.log(o);
            //     console.log(Object.keys(o)[0]);
            //     const playerNames = Object.keys(o);
            //     playerNames.map(name =>{

            //     })
            //    rtn.push(
            //        <h2>
            //             {playerNames.map((itm, idx) =>{
            //                 return( <span>- {itm} -</span>);
            //             })}
            //        </h2>
            //    )
            //     playerNames.map((name) =>{
            //         rtn.push(
            //             <ul>
            //                 {o[name].map( x=>(
            //                     <li>{x.hole} - {x.value}</li>
            //                 ))}
            //             </ul>
            //         );
            //     });                
            // });
            return rtn;
        });
        return (            
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <div>history{history}</div>  
                        </Panel>                    
                    </Col>
                </Row>
            </Grid>
        );
    }
}

class NewStartPage extends Component {
    render(){
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={10} mdOffset={1}>
                        <PageHeader>
                            <Row>
                                <Col 
                                    xsOffset={3} xs={12} 
                                    smOffset={1} sm={3} 
                                    md={5} lg={4}>
                                    Disc Golf
                                </Col>
                                <Col 
                                    xsOffset={3} xs={12} 
                                    smOffset={0} sm={4} 
                                    md={6} lg={5}>
                                     Score Card
                                </Col>
                            </Row>
                        </PageHeader>                    
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
    resetGameData = () =>{
        this.props.actions.resetGameData();
        this.props.actions.loadCourses();        
        this.props.actions.loadPlayers().then(res =>{            
            this.props.actions.loadPlayerNameColors(res);        
        });
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
    removePlayer = (player) =>{
        this.props.actions.removePlayer(player);
        this.props.actions.removePlayerRequest(player);
    }
    handleAddCourse = (course) => {
        this.props.actions.addCourse(course);
        this.props.actions.addCourseRequest(course);
    }
    removeCourse = (course) =>{
        this.props.actions.removeCourseRequest(course);
        this.props.actions.removeCourse(course);
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
        const renderStartGame = (props) =>{            
            //this.props.actions.resetGameData();
            return (
             <StartGamePage 
                    handlePlayerSelect={this.handlePlayerSelect} 
                    players={this.props.players}                                                 
                    gameData={gameData}
                    isPlayerSelected={this.isPlayerSelected}
                    playerNameColor={this.props.playerNameColor} 
                    resetGameData={this.resetGameData}
                    startNewGame={this.props.actions.startNewGame}
                    {...props} 
                    />                    
            );
        }
        const renderHistPage = (props) =>{
            
            return (
                <GameHistory history={this.props.gameHistory.games} loadHistory={this.props.actions.loadAllGamesHistory} />
            );
        }
        return (
                <div>
                    
                
                    <Route path="/app/players" render={props =>(
                        <PlayerPage
                            addPlayer={this.props.actions.addPlayer}
                            playerList={this.props.players.players}
                            removePlayer={this.removePlayer}                            
                         />
                    )} />
                    <Route path="/app/course" render={props =>(
                        <CoursePage 
                            handleAddCourse={this.handleAddCourse} 
                            courses={courses} {...props}
                            removeCourse={this.removeCourse}
                            />
                    )} />
                    <Route path="/app/game-list" render={renderHistPage} /> 
                    <Route path='/app/new-game' render={renderStartGame} />
                    <Route 
                        path='/app/select-course' render={props =>(
                            <SelectCourse                                
                                handleCourseSelect={this.handleCourseSelect} 
                                courses={courses} 
                                addSelect 
                                setGameStart={this.props.actions.setGameStart}
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
                                gameOver={this.props.gameData.game_over}
                                gameData={this.props.gameData} 
                                players={this.props.players} 
                                updateScore={this.props.actions.updateScore}
                                changePlayer={this.props.actions.changePlayer}
                                currentTurn={this.props.currentTurn}
                                setRedirect={this.props.actions.setRedirect}
                                changeHole={this.props.actions.changeHole}
                                startNewGame={this.props.actions.startNewGame}
                                setCount={this.props.actions.setCount}
                                {...props} 
                            />
                        )} 
                    >                        
                    </Route>
                    <Route
                        path='/app/turn/:turn' render={props=>(
                            <TurnPage
                                setGameOver={this.props.actions.setGameOver}
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
                                scores={this.props.players.scores}
                                totals={this.props.players.totalScores}
                                currentStroke={this.props.currentTurn.currentDisplayNumber}
                                setCount={this.props.actions.setCount}
                                started={this.props.started}
                                setGameStart={this.props.actions.setGameStart}
                                unsetGameStart={this.props.actions.unsetGameStart}
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

