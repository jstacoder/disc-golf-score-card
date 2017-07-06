/* jshint esversion: 6 */
/* jshint moz:true */

import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { PageHeader, Grid, Row, Col, Panel, Table, Well, Button } from 'react-bootstrap';
import Sidebar from './sidebar.jsx';
import Heading from './heading.jsx';
import ScoreTable from './score-table.jsx';
import Clock from './clock.jsx';
import Icon from './icon.jsx';
import StartPage from './start-page.jsx';
import AddCourseForm from './add-course-form.jsx';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as axios from 'axios';
import AppRoutes from './app-routes.jsx';

const Home = () => (
	<div>
		<PageHeader>
			Home
		</PageHeader>
	</div>
);

const About = () => (
	<div>
		<Well>
			About
		</Well>
	</div>
);

const Topic = ({ match }) => (
	<div>
		<PageHeader>
			{match.params.topicId}
		</PageHeader>
	</div>
);

const Topics = ({ match }) => (
	<div>
		<PageHeader>
			Topics
		</PageHeader>
		<ul>
			<li>
				<Link to={`${match.url}/rendering`}>
					Rendering
				</Link>
			</li>
			<li>
				<Link to={`${match.url}/components`}>
					Components
				</Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>
					props v. state
				</Link>
			</li>
		</ul>

		<Route path={`${match.url}/:topicId`} component={Topic}/>
		<Route exact path={match.url} render={()=>(
			<h3>Please select a topic</h3>
		)}/>
	</div>
);

const routerNav = () => (
	<Router>
		<div>
			<ul>
				<li><Link to="/app">Home</Link></li>
				<li><Link to="/app/about">About</Link></li>
				<li><Link to="/app/topics">Topics</Link></li>
				<li><Link to="/app/start-page">Start</Link></li>
			</ul>
			<hr />
			<Route exact path="/app" component={Home}/>
			<Route path="/app/about" component={About} />
			<Route path="/app/topics" component={Topics}/>
			<Route path="/app/start-page" component={StartPage}/>
		</div>
	</Router>
);

class MyApp extends Component {
	constructor(...args){
		super(...args);
		this.state = {
			open: true,
			courses: [],
			router: null,

		};
	}
	// componentDidMount = () => {
	// 	let setState = this.setState;
	// 	let self = this;
	// 	let router = Router({
	// 		'/':setState.bind(this, {nowShowing: 'start-page'}),
	// 		'/new-game':setState.bind(this, {nowShowing: 'new-game'}),
	// 		'/new-player':setState.bind(this, {nowShowing: 'new-player'}),
	// 		'/new-course':setState.bind(this, {nowShowing: 'new-course'})
	// 	});
	// 	router.init('/');
	// 	self.setState({router: router});
	// }
	onCourseSubmit = (name, location, number_of_holes) => {
		let course_obj = {
			name:name,
			location: location,
			number_of_holes:number_of_holes
		};
		console.log(`Were submitting the form now, with:
						name: ${name}
						location: ${location}
						holes: ${number_of_holes}
					 now implement the post stuff in app.jsx`);
		axios.post('/course/', course_obj).then((res)=>{
			console.log(res);
			let courses = this.state.courses;
			if(course_obj.number_of_holes){
				course_obj.hole_count = course_obj.number_of_holes;
			}
			courses.push(course_obj);
			this.setState({courses: courses});
		});
	}
	componentWillMount = (e) => {
		let self = this;
		axios.get('/course/').then(function(res){
            console.log('finished request', res);
            self.setState({courses: res.data.filter((itm) => {
				return itm.location && itm.name;
			})});
			console.log(self.state);
        });
	}
	render(){
		let panelHeader = (
			<h3>My Panel</h3>
		);
		return (
			<Grid>
				<Heading />
				<Clock /> 
				{routerNav()}
				<Row>
					<Icon name="star" size="4x" spin={true} />
					<Col md={8} sm={12}>					
						<AppRoutes />
						<Panel
							collapsible
							expanded={this.state.open}
							defaultExpanded={true}
							header={panelHeader}
						>
						<Button onClick={ ()=> this.setState({ open: !this.state.open})}>Click to open</Button>
						<BootstrapTable data={ this.state.courses } striped hover condensed>
							<TableHeaderColumn isKey dataField='name'>Course Name</TableHeaderColumn>
							<TableHeaderColumn dataField='location'>Course Location</TableHeaderColumn>
							<TableHeaderColumn dataField='hole_count'>Holes</TableHeaderColumn>
						</BootstrapTable>
						<AddCourseForm onCourseSubmit={this.onCourseSubmit} />
					</Panel>					
					</Col>					
					<Sidebar />
				</Row>
			</Grid>
		);

	}
}

render(	
		<MyApp />,	
	document.querySelector(
		"#app"
	)
)
