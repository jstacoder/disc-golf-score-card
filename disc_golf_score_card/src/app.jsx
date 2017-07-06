/* jshint esversion: 6 */
/* jshint moz:true */

import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col, Panel, Table, Well, Button } from 'react-bootstrap';
import Sidebar from './sidebar.jsx';
import Heading from './heading.jsx';
import ScoreTable from './score-table.jsx';
import Clock from './clock.jsx';
import Icon from './icon.jsx';
import AddCourseForm from './add-course-form.jsx';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');
let axios = require('axios');
import AppRoutes from './app-routes.jsx';

class MyApp extends Component {
	constructor(...args){
		super(...args);
		this.state = {
			open: true,
			courses: []
		};
	}
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

render(<MyApp />, document.querySelector("#app"))
