import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Grid, Row, Col, Button, PageHeader, Panel, ListGroup, ListGroupItem, FormControl, Checkbox } from 'react-bootstrap' 

export default class StartGamePage extends Component {

    handleChange = (eventValue, player) =>{        
        //this.setState({pdate: true});
        // let element_id = e.target.getAttribute('id');
        let values = this.props.values;
        console.log("event!: ",eventValue);
       // values[player.name] = !values[player.name];
        //player.selected = !player.selected;
        console.log("PLAYER!: ",player);
        //this.setState({values: values});
        console.log(values);
        //let new_class = player.selected ? 'text-success' : 'text-danger';
        let playerNameColor = this.props.playerNameColor;
        //playerNameColor[player.name] = new_class;
        //this.setState({playerNameColor: playerNameColor});
        console.log(playerNameColor);
        //let selectedPlayer = player;
        // this.props.players.map((player)=>{
        //     if(player.name==element_id){
        //         player.selected = true;
        //         this.props.handlePlayerSelect(player);
        //     }
        // });
        // this.forceUpdate();        
        // this.setState({update: false});        
        this.props.handlePlayerSelect(player);
    }
    render(){
        let playerNameColor = this.props.playerNameColor;
        let players = this.props.players;
        let values = this.props.values;
        let handleChange = this.handleChange;
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6} mdOffset={4}> 
                        <PageHeader>Start Game</PageHeader>
                            <Panel header="Add Players">
                                <ListGroup fill>
                                    {players && players.map((p)=>{
                                        let player = p.name;                                        
                                        return (
                                            <ListGroupItem key={`player-${player}`}>
                                                <Row>
                                                <Col xs={6}>                                                
                                                    <h2 className={playerNameColor[player]}>{player}</h2>                                                 
                                                </Col>
                                                <Col xs={2} xsOffset={4}>
                                                    <FormControl type="checkbox" checked={player.selected ? 1 : 0} onChange={(e)=>(this.handleChange(e.target.checked, p))} className={player} data-player={player} />
                                                </Col>
                                                </Row>
                                            </ListGroupItem>
                                        );
                                    })}
                                </ListGroup>
                            </Panel>
                            <LinkContainer to="/app/select-course">
                                <Button bsSize="lg">Select Course</Button>
                            </LinkContainer>
                    </Col>
                </Row>
            </Grid>
        );
    }
}