import React, { Component } from 'react'
import { Grid, Col, Row, Table, PageHeading, Panel } from 'react-bootstrap'

export default class CurrentGameList extends Component {
    constructor(props){
        super(props);
        this.state = {
            game: 222
        };        
    }
    generateHeader = () =>{
        return (
            <thead>
                <tr>
                    <th>Hole: </th>
                    {this.props.course.holes.map((itm) =>(
                        <th key={`${itm}-hole`}>{itm}</th>
                    ))}
                </tr>
            </thead>
        );
    }
    generateRows = () =>{
        return (
            <tbody>
                {this.props.players.map((player)=>{
                    console.log(player.scores);
                    let scores = player.scores;
                    return (
                        <tr key={`row-${player.name}`}>
                            <td>{player.name}</td>
                            {player.scores.map((itm, idx)=>{                           
                                return (
                                    <td key={`data-${player.name}-${idx}`}>{itm}</td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        );
    }
    render(){
        let currentGameHeader = [            
            `Course: ${this.props.course.name}`,
            <br/>,
            `Current Game#: ${this.props.game}`
        ];
        let players = this.props.players;
        let tableHeader = this.generateHeader();
        let rows = this.generateRows();
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6} mdOffset={4}>                    
                        <Panel header={currentGameHeader}>
                            <Table fill bordered hover striped>
                                {tableHeader}
                                {rows}
                            </Table>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
