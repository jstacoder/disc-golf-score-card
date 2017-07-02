import React, { Component } from 'react'
import { render } from 'react-dom'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { Grid, Row, Col, Panel, Table, Well } from 'react-bootstrap'
import Sidebar from './sidebar.jsx'
import Heading from './heading.jsx'
import ScoreTable from './score-table.jsx'

class MyApp extends Component {
	render(){
		return (
			<Grid>
				<Heading />
				<Row>
					<Col 
						md={8} 
						sm={12}
					>
					<ScoreTable />
							<Panel
								collapsible={true}
								defaultExpanded={true}
							>
			    				<p>HI YOU</p>
							</Panel>
							<Well>
								<p>Hi</p>
							</Well>
							<Table striped={true}>
							<thead>
								<tr>
									<th>Hmm</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>ok</td>
								</tr>
							</tbody>
							</Table>
					</Col>
					<Sidebar />
				</Row>
			</Grid>
		);

	}
}

render(<MyApp />, document.querySelector("#app"))
