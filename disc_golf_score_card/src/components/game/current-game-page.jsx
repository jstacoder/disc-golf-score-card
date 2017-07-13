import React, { Component } from 'react';
import { Table, Grid, Row, Col, Button, PageHeader } from 'react-bootstrap';

export default class CurrentGamePage extends Component {
    updateScore(...args){
        this.props.updateScore(...args);
        this.props.changePlayer(this.props.gameData.players);
    }
    renderHoles = () =>{
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
                            <th key={`${hole.id}-header`}>{hole.number}</th>
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
                                        <td>{playerScore || 0}</td>   
                                    );
                                })}
                            </tr>
                        );
                    })}                    
                </tbody>                
            </Table>    
            <Button onClick={(e)=>{this.updateScore(this.props.gameData.players[this.props.players.playersList.currentPlayerIndex], 3, this.props.gameData.course.holes[0].id)}}>update</Button>        
        </div>
        );
    }
    render(){
        const currentPlayer = this.props.gameData.players[this.props.players.playersList.currentPlayerIndex];
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <PageHeader>{this.props.gameData.course.name} <small>current player: {currentPlayer.name}</small></PageHeader>
                        <ul>                            
                            {this.props.gameData.players.map(player => (<li key={player.name}>{player.name}</li>))}
                        </ul>
                        {this.renderHoles()}                                        
                    </Col>
                </Row>
            </Grid>
        );
    }
} 