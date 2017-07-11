/* jshint esversion: 6 */
import React, { Component } from 'react';
import ScoreTable from './course-list';
import { Grid, Row, Col, FormControl } from 'react-bootstrap';

export default class SelectCourse extends Component {
    constructor(props){
        super(props);    
    }
    handleCourseSelect = (course) =>{
        this.props.handleCourseSelect(course);
    }
    render(){
        return (
            <Grid>
                <Row>
                      <Col xs={12} md={6} mdOffset={4}> 
  
                            <ScoreTable courseValues={this.props.courseValues} courses={this.props.courses} addSelect handleCourseSelect={this.handleCourseSelect} />
                      </Col>
                </Row>
            </Grid>            
        );
    }
}
