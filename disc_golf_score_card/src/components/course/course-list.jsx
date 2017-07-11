import React, { Component } from 'react';
import { Row, Col, Table, Panel, Button, ListGroup, ListGroupItem, PageHeader, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const axios = require('axios');

class ScoreTable extends Component {
    constructor(props){
        super(props);       
        let values = {};
        console.log(this.props);
        this.props.courses.map((course)=>{
            values[course.name] = false;
        });
        
        this.state = {
            values:values
        };
    }
    handleChange = (e) =>{
        let course_name = e.target.getAttribute('id');
        this.setCourse(course_name);
    }
    setCourse = (course_name) =>{
        let values = this.state.values;        
        let selectedCourse;
        this.props.courses.map((course) =>{
            values[course.name] = false;
            document.getElementById(course.name).checked = false;
            if(course.name == course_name){
                selectedCourse = course;
            }
        });
        console.log(values);
        values[course_name] = true;
        document.getElementById(course_name).checked = true;
        console.log(values);
        this.setState({values:values});
        this.props.handleCourseSelect(selectedCourse);

    }
    clickListGroup = (e) =>{
        let course_id = parseInt(e.currentTarget.getAttribute('id'));
        let course_name;
        this.props.courses.map((course)=>{
            console.log(course, course_id);
            if(course.id === course_id){
                course_name = course.name;
            }
        });
        console.log(course_name);
        if(!course_name){
            return false;
        }
        this.setCourse(course_name);
    }
    render(){
        let courses = this.props.courses;
        let addSelect = this.props.addSelect;
        let values = this.props.courseValues;

        return (
            <div>
                <PageHeader>Courses</PageHeader>
                <Panel>
                    <ListGroup fill>{courses.map((itm)=>{
                            let groupEnd = addSelect ? <FormControl id={itm.name} type="checkbox" checked={this.props.courseValues[itm.name]} onChange={this.handleChange} /> : '';
                            return (
                                <ListGroupItem key={itm.id} onClick={this.clickListGroup} id={`${itm.id}`}>
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