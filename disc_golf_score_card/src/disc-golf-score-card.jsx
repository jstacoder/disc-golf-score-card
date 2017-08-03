/* jshint esversion: 6 */

import React, {Component} from 'react';
import {render} from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import {Route, Redirect} from 'react-router-dom';
import {ConnectedRouter as Router} from 'react-router-redux';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import * as axios from 'axios';

import {
    Button,
    Grid,
    Row,
    Col,
    PageHeader,
    Panel,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import PlayerPage from './components/player/player-page';
import CoursePage from './components/course/course-page';
import CurrentGameList from './components/game/current-game-list';
import StartGamePage from './components/game/start-game';
import SelectCourse from './components/course/select-course';
import CurrentGamePage from './components/game/current-game-page';
import TurnPage from './components/turn/turn-page';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './actions';

import {history} from './store/configureStore';

class GameHistory extends Component {
    componentWillMount = () => {
        this
            .props
            .loadHistory();
    }
    createListGroup = (children) => {
        return (
            <ListGroup fill>
                {children}
            </ListGroup>
        );
    }
    createListGroupItem = (content, url) => {
        return (
            <LinkContainer to={url}>
                <ListGroupItem>
                    {content}
                </ListGroupItem>
            </LinkContainer>
        );
    }
    render() {
        let game,
            playerHistorys;
        const history = this
            .props
            .history
            .map((itm) => {
                [game, playerHistorys] = itm;
                console.log("PLAYER HIST: ", playerHistorys);
                let rtn = [ < p > {
                        game.date
                    } - {
                        game.course
                    } < /p>
            ];
            
            let gamePlayerScores = {};
            const gamePlayers = playerHistorys.map(itm =>{
                const name = Object.keys(itm)[0];
                gamePlayerScores[name] = itm[name];
                return name;
            });
            const players = gamePlayers.map( (itm, idx) =>{
                const playerStyle = {
                    display:'inline-block',
                    marginRight:'3px'
                };
                const lineEnd = (gamePlayers.length - 1) == idx ? '' : ', ';
                return (
                    <p style={playerStyle}>{itm}{lineEnd} </p >);
                });
            rtn.push(players);
            const gameUrl = `/app/game/${game.id}`;
            return this.createListGroupItem(rtn, gameUrl);
        });
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <PageHeader>
                            History
                        </PageHeader>
                    </Col>
                    <Col xs={12}>
                        <Panel>
                            {this.createListGroup(history)}
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

class NewStartPage extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={10} mdOffset={1}>
                        <PageHeader>
                            <Row>
                                <Col xsOffset={3} xs={12} smOffset={1} sm={3} md={5} lg={4}>
                                    Disc Golf
                                </Col>
                                <Col xsOffset={3} xs={12} smOffset={0} sm={4} md={6} lg={5}>
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

function GameRoute({match}) {
    return (
        <div>
            <PageHeader>Game #:{match.params.game_id}</PageHeader>
        </div>
    );
}

export default class DisGolfScoreCardRoutes extends Component {
    isPlayerSelected = (player) => {
        return this
            .props
            .gameData
            .players
            .indexOf(player) > -1;
    }
    resetGameData = () => {
        this
            .props
            .actions
            .resetGameData();
        this
            .props
            .actions
            .loadCourses();
        this
            .props
            .actions
            .loadPlayers()
            .then(res => {
                this
                    .props
                    .actions
                    .loadPlayerNameColors(res);
            });
    }
    componentWillMount = () => {
        this
            .props
            .actions
            .loadCourses();
        this
            .props
            .actions
            .loadPlayers()
            .then(res => {
                this
                    .props
                    .actions
                    .loadPlayerNameColors(res);
            });
    }
    handleCourseSelect = (course) => {
        this
            .props
            .actions
            .selectCourse(course);
    }
    handlePlayerSelect = (player) => {
        this
            .props
            .actions
            .selectPlayer(player);
        this
            .props
            .actions
            .togglePlayerNameColor(player);
    }
    removePlayer = (player) => {
        this
            .props
            .actions
            .removePlayer(player);
        this
            .props
            .actions
            .removePlayerRequest(player);
    }
    handleAddCourse = (course) => {
        this
            .props
            .actions
            .addCourse(course);
        this
            .props
            .actions
            .addCourseRequest(course);
    }
    removeCourse = (course) => {
        this
            .props
            .actions
            .removeCourseRequest(course);
        this
            .props
            .actions
            .removeCourse(course);
    }
    render() {
        let courses = this.props.courses;
        let players = this.props.players;
        let gameData = this.props.gameData;
        const old_players = [
            {
                name: "kyle",
                scores: [
                    3,
                    3,
                    3,
                    4,
                    2,
                    0,
                    0,
                    0,
                    0
                ]
            }, {
                name: "joe",
                scores: [
                    3,
                    3,
                    3,
                    4,
                    2,
                    0,
                    0,
                    0,
                    0
                ]
            }
        ];
        const renderStartGame = (props) => {
            //this.props.actions.resetGameData();
            return (<StartGamePage
                handlePlayerSelect={this.handlePlayerSelect}
                players={this.props.players}
                gameData={gameData}
                isPlayerSelected={this.isPlayerSelected}
                playerNameColor={this.props.playerNameColor}
                resetGameData={this.resetGameData}
                startNewGame={this.props.actions.startNewGame}
                {...props}/>);
        }
        const renderHistPage = (props) => {

            return (<GameHistory
                history={this.props.gameHistory.games}
                loadHistory={this.props.actions.loadAllGamesHistory}/>);
        }
        return (
            <div>

                <Route
                    path="/app/players"
                    render={props => (<PlayerPage
                    addPlayer={this.props.actions.addPlayer}
                    playerList={this.props.players.players}
                    removePlayer={this.removePlayer}/>)}/>
                <Route
                    path="/app/course"
                    render={props => (<CoursePage
                    handleAddCourse={this.handleAddCourse}
                    courses={courses}
                    {...props}
                    coursesLoading={this.props.courses.coursesList.loading}
                    removeCourse={this.removeCourse}/>)}/>
                <Route path="/app/game-list" render={renderHistPage}/>
                <Route path='/app/new-game' render={renderStartGame}/>
                <Route
                    path='/app/select-course'
                    render={props => (<SelectCourse
                    handleCourseSelect={this.handleCourseSelect}
                    courses={courses}
                    addSelect
                    setGameStart={this.props.actions.setGameStart}
                    startNewGame={this.props.actions.startNewGame}
                    gameData={gameData}
                    players={gameData.players}
                    setHole={this.props.actions.setHole}
                    {...props}
                    {...this.props}/>)}/>
                <Route
                    path='/app/current-game'
                    render={props => (<CurrentGamePage
                    gameOver={this.props.gameData.game_over}
                    gameData={this.props.gameData}
                    players={this.props.players}
                    updateScore={this.props.actions.updateScore}
                    changePlayer={this.props.actions.changePlayer}
                    currentTurn={this.props.currentTurn}
                    setRedirect={this.props.actions.setRedirect}
                    changeHole={this.props.actions.changeHole}
                    startNewGame={this.props.actions.startNewGame}
                    setCount={this.props.actions.setStroke}
                    {...props}/>)}></Route>
                <Route
                    path='/app/turn/:turn'
                    render={props => (<TurnPage
                    setGameOver={this.props.actions.setGameOver}
                    incrementCount={this.props.actions.addStroke}
                    decrementCount={this.props.actions.removeStroke}
                    resetCount={this.props.actions.resetCount}
                    gameData={this.props.gameData}
                    updateScore={this.props.actions.updateScore}
                    currentTurn={this.props.currentTurn}
                    changeHole={this.props.actions.setHole}
                    changePlayer={this.props.actions.changePlayer}
                    setGameStart={this.props.actions.setGameStart}
                    addNewHoleScore={this.props.actions.addNewHoleScore}
                    updateTotal={this.props.actions.updateTotal}
                    scores={this.props.players.scores}
                    totals={this.props.players.totalScores}
                    currentStroke={this.props.currentTurn.currentStrokes}
                    setCount={this.props.actions.setStroke}
                    started={this.props.started}
                    setGameStart={this.props.actions.setGameStart}
                    unsetGameStart={this.props.actions.unsetGameStart}
                    {...props}
                    {...this.props}/>)}/>
                <Route path="/app/game">
                    <Route path="/app/game/:game_id" component={GameRoute}/>
                </Route>
                <Route path="/app" exact component={NewStartPage}/>
            </div>
        );
    }
}
