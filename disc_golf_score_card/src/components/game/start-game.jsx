import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Grid, Row, Col, Button, PageHeader, Panel } from 'react-bootstrap' 

export default class StartGamePage extends Component {
    render(){
        let players = this.state.players;
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6} mdOffset={4}> 
                        <PageHeader>Start Game</PageHeader>
                            <Panel header={()=>{
                                return (<Button>Add Players</Button>);
                            }}>
                                {players.map((player)=>{
                                    return (
                                            <div>{player.name}</div>
                                    );
                                })}
                            </Panel>
                            {self.state.course ?<Button>Select Course</Button>: <p>Courses:</p>}
                    </Col>
                </Row>
            </Grid>
        );
    }
}