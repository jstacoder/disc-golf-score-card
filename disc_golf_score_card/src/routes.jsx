import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import * as reactBS from 'react-bootstrap';

import AddPlayer from './add-player.jsx';
import AddFrisbee from './add-frisbee.jsx';
import AddGameMain from './add-game-main.jsx';
import ListGames from './list-games.jsx';
import ListPlayer from './list-player.jsx';
import StartPage from './start-page.jsx';



const Topic = ({ match }) => (
	<div>
		<reactBS.PageHeader>
			{match.params.topicId}
		</reactBS.PageHeader>
	</div>
);

const Topics = ({ match }) => (
	<div>
		<reactBS.PageHeader>
			Topics
		</reactBS.PageHeader>
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


export default class routerNav extends Component {
    render(){
        return (
            <Router>
                <div>
                    <reactBS.ListGroup>
                        <LinkContainer to="/app"><reactBS.ListGroupItem>Home</reactBS.ListGroupItem></LinkContainer>
                        <LinkContainer to="/app/about"><reactBS.ListGroupItem>About</reactBS.ListGroupItem></LinkContainer>
                        <LinkContainer to="/app/topics"><reactBS.ListGroupItem>Topics</reactBS.ListGroupItem></LinkContainer>
                        <LinkContainer to="/app/start-page"><reactBS.ListGroupItem>Start</reactBS.ListGroupItem></LinkContainer>
                    </reactBS.ListGroup>
                    <hr />
                    <Route exact path="/app" component={Home}/>
                    <Route path="/app/about" component={About} />
                    <Route path="/app/topics" component={Topics}/>
                    <Route path="/app/start-page" component={StartPage}/>
                </div>
            </Router>
        );
    }
}