import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Table, Grid, Row, Col, Button, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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

        // if(playerIdx == playerCount-1){
        //     console.log("CHANGING TO NEXT HOLE");            
        //     this.props.changeHole(this.props.gameData.course.holes);
        // }        
    }
    renderHoles = (currId) =>{
        let front_holes, back_holes;
        let _holes = [front_holes, back_holes];
        const holes = front_holes = this.props.gameData.course.holes;
        if(holes.length > 9){
            front_holes = [];
            for(let _i = 0; _i != 2; _i++){                
                for(let i = 0; i < 10; i++) {
                    _holes[_i].push(holes[i]);
                }
            }
        }else{
            _holes = [front_holes];
        }
        console.log(_holes);
        const players = this.props.gameData.players;
        const scores = this.props.players.scores;
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
                    {this.props.gameData.players.map((player, pidx) =>{
                        return (
                            <tr>
                                <td><bold>{player.name}</bold></td>
                                {holes.map((hole,hidx) =>{
                                    const playerScore = scores[player.name][hole.id];
                                    return (
                                        <td key={`score-${player.name}-${pidx}-${hidx}`} style={{textAlign:'center'}}>{playerScore || 0}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {/*<Button onClick={(e)=>{this.updateScore(this.props.gameData.players[this.props.currentTurn.currentPlayerIndex], 3, this.props.currentTurn.currentHoleId)}}>update</Button>*/}
            <LinkContainer to="/app/turn/1">
                    <Button>start</Button>
            </LinkContainer>
        </div>
        );
    }
    render(){   
        if(!this.props.gameData.course){
            this.props.setRedirect();
            return (
                <Redirect to='/app' />
            );
        }     
        const course = this.props.gameData.course;
        const holes = course.holes;
        const currHoleId = this.props.currentTurn.currentHoleId || holes[0].id;                
        const currentHole = course.holes[this.props.gameData.holesById[currHoleId]];                        
        const currentPlayer = this.props.gameData.players[this.props.currentTurn.currentPlayerIndex];
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <PageHeader>{this.props.gameData.course.display_name} <small>current player: {currentPlayer.name} current hole: {currentHole.number}</small></PageHeader>
                        <ul>
                            {this.props.gameData.players.map(player => (<li key={`li-${player.name}`}>{player.name}</li>))}
                        </ul>
                        {this.renderHoles(currHoleId)}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
