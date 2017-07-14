/* jshint esversion: 6 */
import React, { Component } from 'react';
import ScoreTable from './course-list';
import { Grid, Row, Col, FormControl } from 'react-bootstrap';

export default class SelectCourse extends Component {    
    handleCourseSelect = (course) =>{
        this.props.handleCourseSelect(course);
        this.props.startNewGame(course);
    }
    render(){
        return (
            <Grid>
                <Row>
                      <Col xs={12} md={6} mdOffset={4}> 
                            <ScoreTable 
                                 courses={this.props.courses} 
                                 addSelect 
                                 handleCourseSelect={this.handleCourseSelect} 
                                 gameData={this.props.gameData}     
                            />
                      </Col>
                </Row>
            </Grid>            
        );
    }
}
