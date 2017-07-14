import React, { Component } from 'react';
import { Table, Grid, Row, Col, Button, PageHeader } from 'react-bootstrap';

export default class CurrentGamePage extends Component {
    constructor(props){
        super(props);
        this.count = 0;
    }
    // componentWillMount(){
    //     let count = 0 ;
    //     console.log("ABIUT TO MOIUNT!!!", this);
    //     while(!this.props.gameData.course){
    //         console.log(count);
    //         count++;
    //     }        
    //     this.props.startNewGame(this.props.gameData.course);
        
    // }
    componentDidMount(){
        console.log("MOUNTED!!! ", this.props.currentTurn);
        //this.props.startNewGame(this.props.gameData.course);
        //this.props.changeHole(this.props.gameData.course.holes, this.props.gameData.course.holes[0].id);
    }
    updateScore(...args){
        this.props.updateScore(...args);
        let playerCount = this.props.gameData.players.length;
        let playerIdx = this.props.currentTurn.currentPlayerIndex;

        this.props.changePlayer(this.props.gameData.players);

        if(playerIdx == playerCount-1){
            console.log("CHANGING TO NEXT HOLE");            
            this.props.changeHole(this.props.gameData.course.holes);
        }        
    }
    renderHoles = (currId) =>{
        const holes = this.props.gameData.course.holes;
        const players = this.props.gameData.players;
        const scores = this.props.players.playersList.scores;
        let player, hole;
        return (
            <div>
                <Table condensed bordered striped>
                <thead>
                    <tr>
                        <th>Player</th>
                        {holes.map(hole =>(
                            <th style={{textAlign: 'center'}} key={`${hole.id}-header`}>{hole.number}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.props.gameData.players.map(player =>{
                        return (
                            <tr>
                                <td><bold>{player.name}</bold></td>
                                {holes.map(hole =>{
                                    const playerScore = scores[player.name][hole.id];
                                    return (
                                        <td style={{textAlign:'center'}}>{playerScore || 0}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Button onClick={(e)=>{this.updateScore(this.props.gameData.players[this.props.currentTurn.currentPlayerIndex], 3, this.props.currentTurn.currentHoleId)}}>update</Button>
        </div>
        );
    }
    render(){        
        const holes = this.props.gameData.course.holes;
        let currentHoleId = this.props.currentTurn.currentHoleId;
        const currentHole = holes.filter((hole) => {            
             return hole.id == currentHoleId;
        })[0];
        const currentPlayer = this.props.gameData.players[this.props.currentTurn.currentPlayerIndex];
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <PageHeader>{this.props.gameData.course.display_name} <small>current player: {currentPlayer.name} current hole: {currentHole.number}</small></PageHeader>
                        <ul>
                            {this.props.gameData.players.map(player => (<li key={player.name}>{player.name}</li>))}
                        </ul>
                        {this.renderHoles(currentHoleId)}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
