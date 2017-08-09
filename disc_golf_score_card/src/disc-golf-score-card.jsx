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
    PanelHeader,
    ListGroup,
    ListGroupItem,
    Badge,
    Label,
    PanelGroup,
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

class  HistoryItem extends Component {
    componentWillMount = () =>{
        console.log('CCCCCCL: ',this.props)
        const { course, date, scores } = this.props.item;
        const key = this.props.itmKey;
        const firstPanel = key === 0;
        this.props.actions.addPanel(key);
        //console.log("added panel", key);
        if(firstPanel){
            this.props.actions.setActive(key);
        }
    }
   
    parseData = (data) =>{
        //const { course, date, holes } = data;
        //const { count, ...players } = data;
        const { course, date, scores } = data;
        let results = [];
     

        return (
            <Col xs={12} md={6}>                
                
                    <Row>                                
                        {scores.map( score =>{            
                            const [ player, hole_scores ] = score;
                            console.log("PLATYERLL : ", player);                                             
                            const rtn = ( 
                                <Col xs={4} md={2}>
                                    <h2>
                                        <Label bsSize="lg" bsStyle="primary"> {player} </Label>
                                    </h2> 
                                </Col>
                            );
                            console.log(rtn);
                            return rtn;
                        })}
                    </Row>                
            </Col>
        );
    }
    render(){                
        return this.parseData(this.props.item);            
    }        
};

class GameHistory extends Component {
    componentWillMount = () => {
        this
            .props
            .loadHistory();
        //this.props.actions.loadGamesHistory();
    }
    componentDidMount = () =>{
        console.log('HHDHDHDHD', this.props.history); 
       if(this.props.history.length){            
            const hist = this.props.history[0];            
            hist.map( itm =>{                    
               console.log('HHDHDHDHD', itm); 
            });
       }    
    }
     parseDate = (date) =>{
        const dateObj = new Date(date);
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();
        const day = dateObj.getDay()+1;
        return `${month}-${day}-${year}`;
    }
    createListGroup = (children, ...rest) => {
        console.log(rest);
        return (
            <ListGroup fill>
                <pre>
                    {rest}
                </pre>
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
    handleSelect = (idx) =>{
        this.props.actions.setActive(idx);
    }
    render() {        
         let items = [];
         if(this.props.history.length){            
            const hist = this.props.history[0];            
                hist.map( (itm, idx) =>{                    
                    const { course, date, scores } = itm;
                    const goodDate = this.parseDate(date);
                    const header = (
                        <h3>{course} <Badge pullRight>{goodDate}</Badge></h3>
                    );
                    items.push(
                        <Panel eventKey={idx} header={header}>    
                            <HistoryItem current={hist} item={itm} itmKey={idx} historyData={this.props.historyData} actions={this.props.actions} />
                        </Panel>
                    );
            });
         }    
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <PageHeader>
                            History
                        </PageHeader>
                    </Col>
                    <Col xs={12}>
                        <Row>
                            <PanelGroup activeKey={this.props.historyData.active} onSelect={this.handleSelect} accordion>                        
                                {items}                            
                            </PanelGroup>
                        </Row>
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
                loadHistory={this.props.actions.loadAllGamesHistory}
                {...this.props}
                />);
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
                    editing={this.props.editing}
                    setCount={this.props.actions.setStroke}
                    {...props}
                    {...this.props}
                    />)}></Route>
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
