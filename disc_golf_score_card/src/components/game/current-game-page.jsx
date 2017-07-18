import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Table, Grid, Row, Col, Button, PageHeader, Caption } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class CurrentGamePage extends Component {
    constructor(props){
        super(props);
        this.count = 0;
    }

    componentDidMount(){
        console.log("MOUNTED!!! ", this.props.currentTurn);
    }
    updateScore(...args){
        this.props.updateScore(...args);
        let playerCount = this.props.gameData.players.length;
        let playerIdx = this.props.currentTurn.currentPlayerIndex;

        this.props.changePlayer(this.props.gameData.players);
    }
    formatNameForDisplay = (name) =>{
        let [start, end ] = name.split('_');

        let fixFirst = (word) =>{
            let [first, ...rest] = word.split('');            
            return first.toUpperCase() + rest.join('');
        }
        return [start, end].map(fixFirst).join(' ')
    }
    renderHoles = (currId) =>{
        let _holes = {front_nine : [], back_nine: []};                
        const holes = this.props.gameData.course.holes;
        let holeCopy = [...holes];
        while(_holes.front_nine.length != 9){
            _holes.front_nine.push(
                holeCopy.splice(0, 1)[0]
            );
        }
        if(holeCopy.length){
            while(holeCopy.length){
                _holes.back_nine.push(
                    holeCopy.splice(0, 1)[0]
                );
            }
        }
        const players = this.props.gameData.players;
        const scores = this.props.players.scores;
        const totals = this.props.players.totalScores;
        let player, hole;
        return Object.keys(_holes).map( (key) =>{
            const holes = _holes[key];    
            let parTotal = holes.reduce( (a, b) => (
                a.par + b.par
            ));
            const styles = {
                textAlign:'center',
                width:'103px',
            };
            const baseStyles = {
                 marginRight: 0, 
                 marginLeft: 0, 
                 backgroundColor: '#fff', 
                 borderColor: '#ddd', 
                 borderWidth: '1px', 
                 borderRadius: '4px 4px 0 0', 
                 WebkitBoxShadow: 'none', 
                 boxShadow: 'none' 
            };
            const moreStyles = {
                position: 'relative',
                padding: '10px 15px 0px',
                margin: '0 -15px 15px',
                borderColor: '#e5e5e5 #eee #eee',
                borderStyle: 'solid',
                borderWidth: '1px 0',
                WebkitBoxShadow: 'inset 0 3px 6px rgba(0,0,0,.05)',
                boxShadow: 'inset 0 3px 6px rgba(0,0,0,.05)'
            };
            const tableStyles = { ...moreStyles, ...baseStyles};
            return holes.length ? (
                <div style={tableStyles} key={key}>
                    <Table condensed bordered striped>
                        <caption>{this.formatNameForDisplay(key)}</caption>
                        <thead>
                            <tr>
                                <th>Hole num</th>
                                {holes.map(hole =>(
                                    <th style={styles} key={`${hole.id}-header`}>{hole.number}</th>
                                ))}
                            </tr>
                            <tr>
                                <th>Par</th>
                                {holes.map(hole =>(
                                    <th style={styles} key={`${hole.id}-par-header`}>{hole.par}</th>
                                ))}
                                <th>{parTotal}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.gameData.players.map((player, pidx) =>{
                                const playerTotal = totals[player.name];
                                return (                                    
                                    <tr key={`tr-${player-name}-${pidx}`}>
                                        <td><bold>{player.name}</bold></td>
                                        {holes.map((hole,hidx) =>{
                                            const playerScore = scores[player.name][hole.id];                                            
                                            return (
                                                <td key={`score-${player.name}-${pidx}-${hidx}`} style={styles}>{playerScore || 0}</td>
                                            );
                                        })}
                                        <td>{playerTotal}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>                    
                </div>
            ) : '' ;
        }).concat(
            [                
                <LinkContainer key={'my-link'} to="/app/turn/1">
                        <Button>{this.props.gameData.game_started ? 'continue' : 'start'} game</Button>
                </LinkContainer>
            ]
        );
    }
    render(){   
        if(!this.props.gameData.course||!this.props.gameData.players.length){
            // this.props.setRedirect();
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
                        <PageHeader>{this.props.gameData.course.display_name}</PageHeader>
                         <p className='lead'><small>current player: {currentPlayer.name}</small></p> 
                         <p className='lead'><small>current hole: {currentHole.number}</small></p>                        
                        {this.renderHoles(currHoleId)}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
