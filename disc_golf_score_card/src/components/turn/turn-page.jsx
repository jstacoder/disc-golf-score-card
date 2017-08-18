/* jshint moz: true */
import React, {Component} from 'react';
import * as RB from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Redirect} from 'react-router-dom';
import Icon from '../widgets/icon';
import calc from '../../utils/geo';

export default class TurnPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changedHoles: this
                .props
                .gameData
                .course
                .holes
                .map(itm => {
                    return false;
                }),
            distance: 0,
            last_latitude:0,
            last_longitude: 0,
            updated: false,
        };
    }
    setHoleLocationStart = () =>{
        this.props.actions.setPos();
        this.props.actions.setPos(false);

    }
    updateHoleLocation = () =>{                
        this.props.actions.setPos(false).then( () =>{
            const lastPosition = this.props.location.currentPosition.position;
            const { latitude: last_latitude, longitude: last_longitude } = lastPosition;
            const { last_latitude: current_latitude, last_longitude: current_longitude } = 
                this.state.updated ? this.state : { last_latitude, last_longitude};
            const distance = calc(last_latitude, last_longitude, current_latitude, current_longitude );
            const player = this.props.gameData.players[this.props.currentTurn.currentPlayerIndex];
            this.props.actions.addThrowToHole(player.name, this.props.currentTurn.turnNumber, this.props.currentTurn.currentStrokes, distance);
            this.setState({
                last_latitude,
                last_longitude,
                distance,
                updated: true,
            });
        })        
    }
    handleFinish = (goToNext = true, goToLast = false) => {

        const currentPlayerIndex = this.props.currentTurn.currentPlayerIndex;
        const players = this.props.gameData.players;
        const course = this.props.gameData.course;
        const holes = course.holes;

        const player = players[currentPlayerIndex];
        let nextPlayerIdx;
        let _changeHole;
        if (goToNext) {
            if (currentPlayerIndex === (players.length - 1)) {
                _changeHole = true;
                nextPlayerIdx = 0;
            } else {
                _changeHole = false;
                nextPlayerIdx = currentPlayerIndex + 1;
            }
        } else if (currentPlayerIndex === 0) {
            _changeHole = true;
            nextPlayerIdx = players.length - 1;
        } else {
            _changeHole = false;
            nextPlayerIdx = currentPlayerIndex - 1;
        }
        const changeHole = _changeHole;
        const score = this.props.currentTurn.currentStrokes;
        const holeId = this.props.currentTurn.currentHoleId;

        const isFirstHole = holeId == course.holes[0].id;
        console.log('is first hole: ', isFirstHole);

        const score_card_id = this.props.gameData.score_card_id;
        if (this.state.changedHoles[holeId]) {
            this
                .props
                .updateScore(player, score, holeId);
            this
                .props
                .updateTotal(player, score);
            this
                .props
                .addNewHoleScore(score_card_id, holeId, player, score);
        }
        this
            .props
            .changePlayer(nextPlayerIdx); //this.props.gameData.players, goToNext, goToLast);
        const nextPlayer = players[nextPlayerIdx]; //goToNext ? (changeHole ? 0 : currentPlayerIndex + 1) : (changeHole ? players.length - 1 : currentPlayerIndex - 1) ];
        const nextHoleId = changeHole
            ? (goToNext
                ? (holeId + 1)
                : (holeId - 1))
            : holeId;
        const nextHole = holes[nextHoleId];
        const nextPlayerScores = this.props.scores[nextPlayer.name];
        const nextScore = nextPlayerScores[nextHoleId];
        console.log(nextHole);
        // const course.holes[this.props.gameData.holesById[currHoleId]]; let nextScore
        // = 0; if(this.props.scores[nextPlayer.name] !== undefined){     nextScore =
        // this.props.scores[nextPlayer.name][nextHole.id];     if(nextScore){
        this
            .props
            .setCount({stroke: nextScore});
        //     } }

        console.log("*(&(*&^(&*^(*&^    NEXT PLAYR: ", nextPlayer, changeHole, nextHole.id);

        if (changeHole) {
            console.log("CALLING CHANGE HOLE WITH: ", nextHoleId);
            this
                .props
                .changeHole(nextHoleId);
        }
    }
    incrementCount = () => {
        this.updateHoleLocation();
        this
            .props
            .incrementCount();
        this.setState({
            changedHoles: this
                .state
                .changedHoles
                .map((itm, idx) => {
                    if (idx === this.props.currentTurn.currentHoleId) {
                        return true;
                    }
                    return itm;
                })
        });
    }
    decrementCount = () => {
        this
            .props
            .decrementCount();
        this.setState({
            changedHoles: this
                .state
                .changedHoles
                .map((itm, idx) => {
                    if (idx === this.props.currentTurn.currentHoleId) {
                        return true;
                    }
                    return itm;
                })
        });
    }
    getCurrOffset(num, par) {
        if (num == par) {
            return 0;
        }
        if (num < par) {
            return -(par - num);
        }
        if (num > par) {
            return num - par;
        }
    }
    goToNextTurn = (holeId) => {
        this.handleFinish(true, false, holeId);
    }
    goToLastTurn = (holeId) => {
        this.handleFinish(false, true, holeId);
    }
    getNextButton = () => {
        const course = this.props.gameData.course;
        const holes = course.holes;
        const players = this.props.gameData.players;
        const score = this.props.currentTurn.currentStrokes;
        const currHoleId = this.props.currentTurn.currentHoleId;
        const currPlayerIdx = this.props.currentTurn.currentPlayerIndex;
        const playersLength = players.length - 1;
        const score_card_id = this.props.gameData.score_card_id;
        const player = players[currPlayerIdx];
        const finishRound = () => {
            const course = this.props.gameData.course;
            const holes = course.holes;
            const players = this.props.gameData.players;
            const score = this.props.currentTurn.currentStrokes;
            const currHoleId = this.props.currentTurn.currentHoleId;
            const currPlayerIdx = this.props.currentTurn.currentPlayerIndex;
            const playersLength = players.length - 1;
            const score_card_id = this.props.gameData.score_card_id;
            const player = players[currPlayerIdx];
            this
                .props
                .updateScore(player, score, currHoleId);
            this
                .props
                .updateTotal(player, score);
            this
                .props
                .addNewHoleScore(score_card_id, currHoleId, player, score);
            this
                .props
                .history
                .push("/app/current-game");
        };
        if ((currHoleId == holes.length - 1) && (currPlayerIdx == playersLength)) {
            return (
                <RB.Button
                    onClick={e => {
                    finishRound()
                }}
                    bsSize="lg"
                    bsStyle="primary"
                    block>Next Turn</RB.Button>
            );
        } else {

            return (
                <RB.Button
                    onClick={e => {
                    this.goToNextTurn(this.props.currentTurn.currentHoleId)
                }}
                    bsSize="lg"
                    bsStyle="primary"
                    block>Next Turn</RB.Button>
            );
        }
    }
    getLastButton = () => {
        const course = this.props.gameData.course;
        const holes = course.holes;
        const currHoleId = this.props.currentTurn.currentHoleId;
        const currPlayerIdx = this.props.currentTurn.currentPlayerIndex;

        if ((currHoleId == holes[0].id) && (currPlayerIdx == 0)) {
            return (
                <LinkContainer to="/app/current-game">
                    <RB.Button bsSize="lg" bsStyle="primary" block>Last Turn</RB.Button>
                </LinkContainer>
            );
        } else {
            return (
                <RB.Button
                    onClick={e => {
                    this.goToLastTurn(this.props.currentTurn.currentHoleId)
                }}
                    bsSize="lg"
                    bsStyle="primary"
                    block>Last Turn</RB.Button>
            );
        }
    }
    componentWillMount() {
        const player = this.props.gameData.players[this.props.currentTurn.currentPlayerIndex];
        if(!(player.name in this.props.location.throws)){
            this.props.actions.addPlayerToThrows(player.name);
            this.props.actions.addHoleToPlayer(player.name, this.props.currentTurn.turnNumber);
        }
        if((player.name in this.props.location.throws) && !(this.props.currentTurn.turnNumber in this.props.location.throws[player.name])){
            this.props.actions.addHoleToPlayer(player.name, this.props.currentTurn.turnNumber);
        }
        const currHoleId = this.props.currentTurn.currentHoleId;
        const course = this.props.gameData.course;
        const ended = currHoleId == course.holes[course.holes.length - 1].id;
        ended && this
            .props
            .setGameOver();
    }
    render() {
        const course = this.props.gameData.course;
        const holes = course.holes;
        const player = this.props.gameData.players[this.props.currentTurn.currentPlayerIndex];

        let currHoleId = this.props.currentTurn.currentHoleId;
        const hole = course.holes[this.props.currentTurn.turnNumber];

        const playerScore = this.props.scores[player.name];
        const currentPlayerScore = this.props.currentTurn.currentStrokes;

        const currDisplayNumber = currentPlayerScore;
        console.log(course, hole, 'currHoleId ', currHoleId,
        //'hole.id ', hole.id,
        this.props)
        const currDisplayOffset = this.getCurrOffset(currDisplayNumber, hole.par);
        const styles = {
            position: 'relative',
            left: '14px',
            top: '6px'
        };
        const offsetNames = {
            '-2': 'eagle',
            '-1': 'birdy',
            '0': 'par',
            '1': 'bogey',
            '2': 'double bogey',
            'undefined': '',
            'null': ''
        };
        const labelStyle = {
            marginLeft: '46%',
            padding: '.6em .6em .6em',
            fontSize: '94%'
        };
        const panelStyles = {
            marginBottom: '0px'
        };
        const isFirstHole = currHoleId == course.holes[0].id;

        let STARTED = isFirstHole
            ? 'first hole'
            : 'after first hole';
        let ENDED = currHoleId == course.holes[course.holes.length - 1].id
            ? 'on last hole'
            : 'not on last hole';
        let isFirstPlayer = this.props.currentTurn.currentPlayerIndex == 0
            ? 'first player'
            : 'after first player';
        console.log(isFirstPlayer);
        const hasLocation = this.props.location.loaded;
        const holeLon = hasLocation ? this.props.location.currentPosition.position.longitude : '';
        const holeLat = hasLocation ? this.props.location.currentPosition.position.latitude : '';
        const holeLocation = hasLocation ? (<p>Current Location: {`lat: ${holeLat}, lon: ${holeLon}`} distance: {`${this.state.distance}`}</p>) : (<p></p>);
        return (
            <RB.Grid style={{
                marginTop: "5%"
            }}>
                <RB.Row>                
                    <RB.Col xs={12} sm={12} md={6} lg={8} mdOffset={3} lgOffset={2}>
                        <RB.Row>
                            <RB.Col xs={12}>
                                <LinkContainer to="/app/current-game">
                                    <RB.Button block bsSize="lg">back to list</RB.Button>
                                </LinkContainer>
                            </RB.Col>
                        </RB.Row>
                        <RB.Button onClick={this.setHoleLocationStart} block>Track Hole</RB.Button>
                        {holeLocation}
                        <RB.Panel style={panelStyles}>
                            <RB.PageHeader className='text-center'>{course.display_name}</RB.PageHeader>
                            <RB.Label bsSize='lg' style={labelStyle} bsStyle="success">
                                hole {this.props.currentTurn.currentHoleId + 1}
                            </RB.Label>
                            <RB.Row>
                                <RB.Col xs={12}>
                                    <h2 className="text-center">
                                        <small>par {hole.par}</small>
                                    </h2>
                                    <h1 className="text-center">{player.name}</h1>
                                    <p className="text-center lead">
                                        Stroke: {currDisplayNumber || 0}
                                        {currDisplayNumber > 1
                                            ? <small>
                                                    ({currDisplayOffset}) [{offsetNames[currDisplayOffset]}]
                                                </small>
                                            : ''
}
                                    </p>
                                </RB.Col>
                            </RB.Row>
                            <RB.Row>
                                <RB.Col xs={12}>
                                    <RB.Row>
                                        <RB.Col xs={6}>
                                            <RB.Row>
                                                <RB.Col md={4} xs={8} sm={8} xsPush={3}>
                                                    <RB.Well onClick={this.decrementCount} bsSize="sm">
                                                        <p style={styles}>
                                                            <Icon name="minus" size="4x"/>
                                                        </p>
                                                    </RB.Well>
                                                </RB.Col>
                                            </RB.Row>
                                        </RB.Col>
                                        <RB.Col xs={6}>
                                            <RB.Row>
                                                <RB.Col md={4} xs={8} sm={8} xsOffset={1} smOffset={4} mdOffset={3}>
                                                    <RB.Well onClick={this.incrementCount} bsSize="sm">
                                                        <p style={styles}>
                                                            <Icon name="plus" size="4x"/>
                                                        </p>
                                                    </RB.Well>
                                                </RB.Col>
                                            </RB.Row>
                                        </RB.Col>
                                    </RB.Row>
                                </RB.Col>
                            </RB.Row>
                            <RB.Row>
                                <RB.Col xs={6}>
                                    {this.getLastButton()}
                                </RB.Col>
                                <RB.Col xs={6}>
                                    {this.getNextButton(currHoleId == course.holes[0].id)}
                                </RB.Col>
                            </RB.Row>
                        </RB.Panel>
                    </RB.Col>
                </RB.Row>
            </RB.Grid>
        );
    }
}
