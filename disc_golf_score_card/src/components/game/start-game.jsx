import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Grid, Row, Col, Button, PageHeader, Panel, ListGroup, ListGroupItem, FormControl, Checkbox } from 'react-bootstrap' 

export default class StartGamePage extends Component {
     componentDidMount = () =>{
        this.props.resetGameData();
    }
    handleChange = (eventValue, player) =>{               
        let playerNameColor = this.props.playerNameColor;                
        this.props.handlePlayerSelect(player);
        console.log("event!: ",eventValue);
        console.log("PLAYER!: ",player);                
        console.log(playerNameColor);        
        console.log(this.props);
    }
    render(){        
        const players = this.props.players.players;        
        const handleChange = this.handleChange;
        const isPlayerSelected = this.props.isPlayerSelected;
        const listGroupItemH2Styles = {
            marginTop: '5px',
            marginBottom: '5px',
        };
        
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6} mdOffset={4}> 
                    <LinkContainer to="/app">
                        <Button bsSize="lg" bsStyle="primary" block>back</Button>
                    </LinkContainer>
                        <PageHeader>Start Game</PageHeader>
                            <Panel header="Add Players">
                                <ListGroup fill>
                                    {players &&  players.map((p, i)=>{
                                        let player = p.name;        
                                        const itemClass = isPlayerSelected(p) ? 'active' : '';                                 
                                        return (
                                            <ListGroupItem key={`${i}-player-${player}`} onClick={(e)=>(this.handleChange(e.target.checked, p))} className={itemClass} >
                                                <Row>
                                                    <Col xs={6}>                                                
                                                        <h2 style={listGroupItemH2Styles}>{player}</h2>                                                 
                                                    </Col>
                                                    <Col xs={2} xsOffset={4}>
                                                        <FormControl 
                                                            type="checkbox" 
                                                            checked={this.props.gameData.players.indexOf(p) != -1 ? 1 : 0} 
                                                            onChange={(e)=>(this.handleChange(e.target.checked, p))} 
                                                            className={player} 
                                                            data-player={player} 
                                                        />
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        );
                                    })}
                                </ListGroup>
                            </Panel>
                            <LinkContainer to="/app/select-course">
                                <Button bsSize="lg" block>Select Course</Button>
                            </LinkContainer>
                    </Col>
                </Row>
            </Grid>
        );
    }
}