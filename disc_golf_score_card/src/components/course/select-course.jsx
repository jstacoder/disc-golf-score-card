/* jshint esversion: 6 */
import React, {Component} from 'react';
import ScoreTable from './course-list';
import {Grid, Row, Col, FormControl} from 'react-bootstrap';

export default class SelectCourse extends Component {
    handleCourseSelect = (course) => {
        this
            .props
            .handleCourseSelect(course);
        this
            .props
            .startNewGame(course, this.props.gameData.players);
        this
            .props
            .setHole(0);
        this
            .props
            .actions
            .changePlayer(0);
        this
            .props
            .actions
            .resetTotals();
    }
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={10} mdOffset={1}>
                        <ScoreTable
                            courses={this.props.courses}
                            addSelect
                            handleCourseSelect={this.handleCourseSelect}
                            gameData={this.props.gameData}
                            setGameStart={this.props.setGameStart}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
