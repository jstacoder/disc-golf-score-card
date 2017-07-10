import React, { Component } from 'react';
import { Table, Panel, Button, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
const axios = require('axios');

class ScoreTable extends Component {
    constructor(...args){
        super(...args);
        this.state = {
            data: this.props.courses
        };
    }
    componentWillMount = (e) => {
        this.setState({data: this.props.courses});
        this.getData();
    }


    getData = () =>{
        let self = this;
        console.log('starting request');
        axios.get('/course/').then(function(res){
            console.log('finished request', res);
            self.setState({data: res.data});
        });
    }

    render(){
        return (
            <div>
                <PageHeader>Courses</PageHeader>
                <Panel>
                    <ListGroup fill>{
                        this.props.courses.map((itm)=>{
                            return (
                                <ListGroupItem key={itm.id}>
                                    Name: {itm.display_name}
                                    <ul key={`${itm.id}-ul`}>                            
                                        <li key={`${itm.id}-location`}>location: {itm.location}</li>
                                        <li key={`${itm.id}-holecount`}>holes: {itm.hole_count}</li>
                                    </ul>
                                </ListGroupItem>
                            );
                        })
                    }</ListGroup>
                </Panel>
            </div>
        );
    }
}

export default ScoreTable