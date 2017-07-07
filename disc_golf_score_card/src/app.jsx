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
import RouterNav from './routes.jsx';

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
				
				<Row>					
					<Col md={8} sm={12}>					
						<Icon name="star" size="4x" spin={true} />
						<RouterNav />
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
