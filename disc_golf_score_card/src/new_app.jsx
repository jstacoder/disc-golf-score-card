/* jshint esversion: 6 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import * as bs from 'react-bootstrap';
import * as bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Router, Route } from 'react-router';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

class PageHeader extends Component {
    constructor(...props){
        super(...props);
        this.state = {
            pageHeaderText: 'home',
        };        
    }
    render() {
        let headerText = this.props.pageHeaderText;
        return (
            <bs.PageHeader>{headerText}</bs.PageHeader>
        );
    }
}

class  PageNavigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: '/home'
        };
        console.log(this.props);
    }
    
    handleSelect = (eventKey, event)  => {
        console.log(event, eventKey); 
        event.preventDefault();
        //alert(`selected ${eventKey}`);    
        this.props.onPageChange(eventKey);
    }
    render = () => {
        let handleSelect = this.handleSelect;
        let currentPage = this.props.currentPage;
        return (
            <bs.Nav bsStyle="pills" stacked activeHref={currentPage} onSelect={handleSelect}>
                <bs.NavItem eventKey="/home" href="/home">Home</bs.NavItem>
                <bs.NavItem eventKey="/game" href='/game' title="Item">Game</bs.NavItem>
                <bs.NavItem eventKey="/players" href='/players'>Players</bs.NavItem>
                <bs.NavDropdown href='#' eventKey="/options" title="Options" id="nav-dropdown">
                    <bs.MenuItem href='/add=player' eventKey="/add-player">Add Player</bs.MenuItem>
                    <bs.MenuItem href='/add-course' eventKey="/add-course">Add Course</bs.MenuItem>
                    <bs.MenuItem href='/settings' eventKey="/settings">Settings</bs.MenuItem>
                    <bs.MenuItem divider />
                    <bs.MenuItem href='/quit' eventKey="/quit">Quit</bs.MenuItem>
                </bs.NavDropdown>
            </bs.Nav>
        );
    }
}

class PlayerList extends Component{
    render(){
        return (
            <ul>{this.props.players.map((itm) =>(
                <li>{itm}</li>
            ))}</ul>   
        );
    }
}

class PlayerForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
        };
    }
    handleChange = (e) =>{   
        this.setState({name: e.target.value});
    }
    handleSubmit = (e) =>{        
        e.preventDefault();
        this.props.handleSubmit(this.state.name);
        this.setState({name: ''});
    }
    render(){
        return (
            <bs.Form onSubmit={this.handleSubmit}>
                <bs.FormGroup>
                    <bs.ControlLabel>Name</bs.ControlLabel>
                    <bs.FormControl onChange={this.handleChange} type="text" value={this.state.name} />
                    <bs.FormControl.Feedback/>
                </bs.FormGroup>
                <bs.FormControl type="submit"/>
            </bs.Form>
        );
    }
}

const players = ['kyle', 'dave','rod'];

class PlayerPage extends Component{
    render(){
        return (
            <div>
                <PlayerList players={this.props.players}/>
                <PlayerForm handleSubmit={this.props.handleSubmit} />
            </div>
        );
        
    }
}

class HomePage extends Component {
    render(){
        return (
            <div>
                <h2>Home Page</h2>
            </div>
        );
    }
}

class GamePage extends Component {
    render(){
        return (
            <div>
                <h2>Game Page</h2>
            </div>
        );
    }
}

class SettingsPage extends Component {
    render(){
        return (
            <div>
                <h2>
                Settings Page
                </h2>
            </div>
        );
    }
}

const courses = [
    {
        name: 'twila reid',
        number_of_holes: 9,
    },
    {
        name: 'el do',
        number_of_holes: 18,
    },
    {
        name:'huntington',
        number_of_holes:18,
    },
    {
        name: 'liberty',
        number_of_holes: 9,
    }
];

class CourseList extends Component{
    constructor(props){
        super(props);        
    }
    render(){
        return (
            <ul>
                {this.props.courses.map((course) =>(
                    <li>{course.name} : {course.number_of_holes}</li>
                ))}
            </ul>
        );
    }
}

class CourseForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            number_of_holes:'',
        }
    }

    handleNameChange = (name) =>{
        this.setState({name});
    }

    handleHoleNumChange = (number_of_holes) =>{
        this.setState({number_of_holes});
    }

    handleSubmit = (e) =>{
        alert(`submitting name: ${this.state.name} and holes: ${this.state.number_of_holes} `);
        e.preventDefault();
        let course = {
            name: this.state.name,
            number_of_holes: this.state.number_of_holes,
        };
        this.props.handleSubmit(course);
        this.setState({name:'', number_of_holes:''});
    }

    render(){
        return (
            <bs.Form onSubmit={this.handleSubmit}>
                <CourseFormName 
                    valueProxy={this.state.name} 
                    sendChange={this.handleNameChange} />
                <CourseFormHoleNumber 
                    valueProxy={this.state.number_of_holes} 
                    sendChange={this.handleHoleNumChange} />
                <bs.FormControl type="submit"/>
            </bs.Form>
        );
    }
}


class CourseFormHoleNumber extends Component{
    constructor(props){
        super(props);
        this.state = {
            number_of_holes: ''
        }        
    }
    handleChange = (e) =>{
        //this.setState({number_of_holes: e.target.value});
        this.props.sendChange(e.target.value);
    }
    render(){
        return (
            <bs.FormGroup>
                <bs.ControlLabel>Number Of Holes</bs.ControlLabel>
                <bs.FormControl type="text" onChange={this.handleChange} value={this.props.valueProxy} />
            </bs.FormGroup>
        );
    }
}

class CourseFormName extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: ''
        }        
    }
    handleChange = (e) =>{
        //this.setState({name: e.target.value});
        this.props.sendChange(e.target.value);
    }
    render(){
        return (
            <bs.FormGroup>
                <bs.ControlLabel>Name</bs.ControlLabel>
                <bs.FormControl type="text" onChange={this.handleChange} value={this.props.valueProxy} />
            </bs.FormGroup>
        );
    }
}

class CoursePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            courses: courses
        };
    }
    handleSubmit = (course) =>{
        alert(`submitted new course ${course.name}`);
        let courses = this.state.courses;
        courses.push(course);
        this.setState({courses});
    }
    render(){
        return (
            <div>
                <h2>Course Page</h2>
                <CourseList courses={this.state.courses}/>
                <CourseForm  handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

const components = {
    players: PlayerPage,
    Play: HomePage,
    home: HomePage,
    game: GamePage,
    'add-player':PlayerPage,
    'list-player': PlayerPage,
    'settings': SettingsPage,
    'quit': PlayerPage,
    'add-course':CoursePage,
    'list-course':CoursePage,
};

class PageApplication extends Component{
    render() {
        let page = this.props.page;
        let CurrentComponent = components[this.props.component];
        return (            
            <bs.Col md={10}>    
                <bs.Well>
                    <p>{page}</p>
                    <CurrentComponent {...this.props} />
                </bs.Well>
            </bs.Col>
        );
    }
}

const PageFooter = () => (
    <bs.Col md={12}>
        <bs.Well width="100%">Footer</bs.Well>
    </bs.Col>
);

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: '/home',
            pageHeaderText: 'home',
            players:players,

        };
    }
    addPlayer = (name) =>{
        if(this.state.players.indexOf(name)===-1){
            let players = this.state.players;
            players.push(name);
            this.setState({players});
        }
    }
    fixPathToHeader = (page) =>{
        return page.slice(1, page.length);
    }
    setPage = (page) =>{
        let fixHeader = this.fixPathToHeader;
        //alert(`current Page: ${page}`);
        let oldHeader = this.state.currentPage;
        this.setState({
            currentPage: page,
            pageHeaderText: fixHeader(page),            
        });
    }
    updateText = (pageHeaderText) => {
        this.setState({pageHeaderText});
    }
    handleSubmit = (name) =>{
        //alert(`submitted ${name}`);
        this.addPlayer(name);
    }
    render(){
        let setPage = this.setPage;
        let pageHeaderText = this.state.pageHeaderText;
        let updateText = this.updateText;        
        let currentPage = this.state.currentPage;
        let pageComponent = pageHeaderText;
        
        /* jshint ignore:start */
        return (            
            <bs.Grid>
                <bs.Row>
                    <bs.Col md={12}>                        
                        <PageHeader onPageChange={setPage} pageHeaderText={pageHeaderText} />
                        <PageNavigation onPageChange={setPage} currentPage={currentPage}/>
                    </bs.Col>
                    <PageApplication handleSubmit={this.handleSubmit} page={currentPage} players={players} component={pageComponent} />
                    <PageFooter />
                </bs.Row>
            </bs.Grid>
        );
        /* jshint ignore:end */
    }
}

render(<App />, document.getElementById('app'))