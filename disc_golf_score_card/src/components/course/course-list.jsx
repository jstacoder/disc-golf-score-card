import React, { Component } from 'react';
import { Row, Col, Table, Panel, Button, ListGroup, ListGroupItem, PageHeader, FormControl, Form } from 'react-bootstrap';
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
        //this.props.startNewGame(course);
    }
    isItemChecked = (itm) => {
        return this.props.gameData.course && this.props.gameData.course.name == itm.name || '';
    }
    render(){
        let courses = this.props.courses.coursesList.courses;
        let addSelect = this.props.addSelect;
        const listGroupStyles = {
            marginBottom: '0px'
        };
        //let values = this.props.courseValues;

        return (
            <div>
                <PageHeader>Courses</PageHeader>
                <Panel>
                    <Form fill>
                    <ListGroup style={listGroupStyles} fill>{courses.map((itm)=>{
                            let groupEnd = addSelect ? <FormControl id={itm.name} type="checkbox" checked={this.isItemChecked(itm)} onChange={e=>{this.handleChange(itm)}} value={this.isItemChecked(itm)} /> : '';
                            return (
                                <ListGroupItem key={itm.id} onClick={(e)=>{this.clickListGroup(itm)}} id={`${itm.id}`}>
                                    <Row>
                                        <Col xs={10}>
                                            <p>Name: {itm.display_name}</p>
                                            <ul key={`${itm.id}-ul`}>                            
                                                <li key={`${itm.id}-location`}>location: {itm.location}</li>
                                                <li key={`${itm.id}-holecount`}>holes: {itm.hole_count}</li>

                                            </ul>                                    
                                        </Col>
                                        <Col xs={2}>
                                            {groupEnd}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            );
                        })
                    }</ListGroup>
                    </Form>
                </Panel>
                
                <LinkContainer to="/app/current-game">
                    <Button block bsSize="lg">Confirm</Button>
                </LinkContainer>
            </div>
        );
    }
}

export default ScoreTable