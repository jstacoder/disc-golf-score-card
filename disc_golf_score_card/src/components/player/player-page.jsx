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
            playerList: props.players || [],
            sendRefreshRequest:props.sendRefreshRequest,
        };
        console.log(this.state);
        console.log(props);
    }
    sendRefreshRequest = (player) =>{
        let currentPlayers = this.state.playerList;
        currentPlayers.push(player);
        this.setState({playerList:currentPlayers});
    }    
    render(){
        /* jshint ignore:start */
        let send = this.sendRefreshRequest;
        let playerList = this.state.playerList;
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} mdOffset={4} lgOffset={4}>
                        <LinkContainer to="/app">
                            <Button bsStyle="primary" bsSize="lg" block>
                                back
                            </Button>
                        </LinkContainer>
                        <ListPlayer updatePlayers playerList={playerList} />
                        <AddPlayer sendRefreshRequest={send} />
                    </Col>
                </Row>
            </Grid>
        );
        /* jshint ignore:end */
    }
}