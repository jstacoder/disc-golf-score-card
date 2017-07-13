import React, { Component } from 'react';
import { Row, Col, Table, Panel, Button, ListGroup, ListGroupItem, PageHeader, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const axios = require('axios');

class ScoreTable extends Component {    
    handleChange = (name) =>{       
        this.setCourse(name);
    }
    setCourse = (course) =>{        
        this.props.handleCourseSelect(course);
    }
    clickListGroup = (course) =>{                
        this.setCourse(course);
    }
    render(){
        let courses = this.props.courses.coursesList.courses;
        let addSelect = this.props.addSelect;
        //let values = this.props.courseValues;

        return (
            <div>
                <PageHeader>Courses</PageHeader>
                <Panel>
                    <ListGroup fill>{courses.map((itm)=>{
                            let groupEnd = addSelect ? <FormControl id={itm.name} type="checkbox" checked={this.props.gameData.course && this.props.gameData.course.name == itm.name} onChange={e=>{this.handleChange(itm)}} /> : '';
                            return (
                                <ListGroupItem key={itm.id} onClick={(e)=>{this.clickListGroup(itm)}} id={`${itm.id}`}>
                                    <Row>
                                        <Col xs={11}>
                                            <p>Name: {itm.display_name}</p>
                                            <ul key={`${itm.id}-ul`}>                            
                                                <li key={`${itm.id}-location`}>location: {itm.location}</li>
                                                <li key={`${itm.id}-holecount`}>holes: {itm.hole_count}</li>

                                            </ul>                                    
                                        </Col>
                                        <Col xs={1}>
                                            {groupEnd}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            );
                        })
                    }</ListGroup>
                </Panel>
                
                <LinkContainer to="/app/current-game">
                    <Button block bsSize="lg">Confirm</Button>
                </LinkContainer>
            </div>
        );
    }
}

export default ScoreTable