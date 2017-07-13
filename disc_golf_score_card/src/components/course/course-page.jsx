/* jshint esversion: 6 */
import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AddCourseForm from './add-course-form';
import ScoreTable from './course-list';
import * as axios from 'axios';

export default class CoursePage extends Component {
    handleSubmit = (name, location, number_of_holes) =>{
        alert(`got ${name} ${location} ${number_of_holes}`);
        let newCourse = {
            name,
            location,
            number_of_holes,
            hole_count: number_of_holes,
            display_name: name,
        };
        //let courses = this.state.courses;
        //courses.push(newCourse);
        //this.setState({courses: courses});
        //console.log(courses);
        this.props.handleAddCourse(course);
    }

    render(){
        let courses = this.props.courses;
        console.log(this.props);
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6} mdOffset={4}>
                        <LinkContainer to="/app">
                            <Button bsSize="lg" block bsStyle="primary">Back</Button>
                        </LinkContainer>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} mdOffset={0}>                        
                        <ScoreTable courses={courses}/>    
                    </Col>
                    <Col xs={12} md={6} mdOffset={0}>
                        <AddCourseForm onCourseSubmit={this.handleSubmit} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}