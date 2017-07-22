import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import ListPlayer from './list-player';
import AddPlayer from './add-player';

export default class PlayerPage extends Component {
    constructor(...props){
        super(...props);
        this.state = {
            props: props,
            //playerList: props.players || [],
            sendRefreshRequest:props.sendRefreshRequest,
        };
        console.log(this.state);
        console.log(props);
    }
    sendRefreshRequest = (player) =>{
        let currentPlayers = this.props.playerList;
        currentPlayers.push(player);
        this.setState({playerList:currentPlayers});
    }    
    render(){
        /* jshint ignore:start */
        let send = this.sendRefreshRequest;
        let playerList = this.props.playerList;
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={10} lg={10} mdOffset={1} lgOffset={1}>
                        <LinkContainer to="/app">
                            <Button bsStyle="primary" bsSize="lg" block>
                                back
                            </Button>
                        </LinkContainer>
                        <Row>
                            <Col xs={12} md={9}>
                                <ListPlayer updatePlayers removePlayer={this.props.removePlayer} playerList={playerList} />
                            </Col>
                            
                            <Col xs={12} md={3}>
                                <AddPlayer addPlayer={this.props.addPlayer} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
        /* jshint ignore:end */
    }
}