/* jshint esversion: 6 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import * as axios from 'axios';

import { Button, Grid, Row, Col, PageHeader } from 'react-bootstrap';
import PlayerPage from './components/player/player-page';
import CoursePage from './components/course/course-page';
import CurrentGameList from './components/game/current-game-list';
import StartGamePage from './components/game/start-game';
import SelectCourse from './components/course/select-course';



class NewStartPage extends Component {
    render(){
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} mdOffset={3} lgOffset={3}>
                        <PageHeader>Disc Golf Score Card</PageHeader>
                        <LinkContainer to='/app/new-game'>
                            <Button block bsSize="lg" bsStyle="primary">Start Game</Button> 
                        </LinkContainer>
                        <LinkContainer to="/app/game-list">
                            <Button bsSize="lg" block bsStyle="primary">Game History</Button> 
                        </LinkContainer>
                        <LinkContainer to="/app/players">
                            <Button bsSize="lg" block bsStyle="primary">Players</Button> 
                        </LinkContainer>
                        <LinkContainer to="/app/course">
                            <Button bsSize="lg" block bsStyle="primary">Courses</Button>                         
                        </LinkContainer>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

class DisGolfScoreCardApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            values: {},
            playerNameColor:{},
            courses: [],
            players:[],
            courseValues:{},
            currentGameData: {
                game_id:null,
                players:[],
                course:null,
            }
        }
    }
    componentDidMount = () =>{
        this.loadCourses();
        this.loadPlayers();
    }
    handleCourseSelect = (course) =>{
        let gameData = this.state.currentGameData;
        gameData.course = course;
        this.setState({currentGameData: gameData});
        let values = this.state.courseValues;
        let val = !values[course.name];
        values[course.name] = val;
        this.setState({courseValues: values});
        alert("selected ", course.name, gameData)
    }
    handlePlayerSelect = (player) => {
        let gameData = this.state.currentGameData;
        gameData.players.push(player);
        let playerNameColor = this.state.playerNameColor;
        let values = this.state.values;
        let val = !values[player.name];
        values[player.name] = val;
        console.log("VAL: ", val, values, player);
        playerNameColor[player.name] = val ? 'text-success' : 'text-danger'; 
        this.setState({values: values});
        this.setState({playerNameColor: playerNameColor});
        let players = this.state.players;
        players.map((itm, idx)=>{
            if(itm.id===player.id){
                console.log(players);
                itm.selected = true;
                players[idx] = itm;
            }
        });
        //this.setState({players});
        //  this.setState({currentGameData: gameData});
    }
    handleAddCourse = (course) =>{
        let courses = this.state.courses;
        courses.push(course);
        console.log('got courses!!');
        this.setState({courses});
    }
    loadCourses = () => {
        let self = this;
        axios.get('/course/').then((res) =>{
            console.log(res);
            let values = {};
            res.data.map((itm)=>{
                values[itm.name] = false;
            });
            self.setState({
                courses: res.data,
                courseValues: values
            });
        }); 
    }
    loadPlayers = () =>{
        let self = this;
        axios.get("/api/player").then((res)=>{
            let values = {};
            let playerNameColor = {};
            res.data.map((itm)=>{
                    values[itm.name] =  false;
            });
            res.data.map((itm)=>{
                    playerNameColor[itm.name] = 'text-danger';
            });
            self.setState({
                players:res.data.map((itm)=>{
                    itm.selected = false;
                    return itm;
                }),
                values: values,
                playerNameColor: playerNameColor
            });
        });
    }   
    render(){
        let courses = this.state.courses;
        let players = this.state.players;
        const old_players = [
            {
                name: "kyle",                
                scores:[
                    3,3,3,4,2,0,0,0,0
                ]
            },
            {
                name: "joe",
                scores:[
                    3,3,3,4,2,0,0,0,0
                ]
            }
        ];        
        const course = {
            name: 'twila reid',
            holes: [1,2,3,4,5,6,7,8,9]
        };
        console.log("COURSES!! ", courses);
        return (
            <Router>
                <div>
                    <Route path="/app" exact component={NewStartPage} />
                    <Route path="/app/players" component={PlayerPage} />
                    <Route path="/app/course" component={props =>(
                        <CoursePage handleAddCourse={this.handleAddCourse} courses={courses} {...props}/>
                    )} />
                    <Route path="/app/game-list" component={props => (
                        <CurrentGameList game={333} players={old_players} course={course} {...props} />
                    )} /> 
                    <Route path='/app/new-game' component={props =>(
                          <StartGamePage handlePlayerSelect={this.handlePlayerSelect} players={players} values={this.state.values} playerNameColor={this.state.playerNameColor} {...props} />
                    )} />
                    <Route path='/app/select-course' component={props =>(
                        <SelectCourse courseValues={this.state.courseValues} handleCourseSelect={this.handleCourseSelect} courses={courses} addSelect players={this.state.currentGameData.players} />
                    )} />
                    <Route path="/" exact>
                            <Redirect path="/app"/>
                    </Route>                                
                </div>
            </Router>
        );
    }
}
render(<DisGolfScoreCardApp />, document.getElementById('app'))