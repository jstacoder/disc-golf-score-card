import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import * as reactBS from 'react-bootstrap';

import AddPlayer from './add-player.jsx';
import AddFrisbee from './add-frisbee.jsx';
import AddGameMain from './add-game-main.jsx';
import ListGames from './list-games.jsx';
import ListPlayer from './list-player.jsx';
import StartPage from './start-page.jsx';


/* jshint ignore:start */
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
		<reactBS.ListGroup>
            <LinkContainer to={`${match.url}/rendering`}>
			    <reactBS.ListGroupItem>				
					Rendering				
			    </reactBS.ListGroupItem>
            </LinkContainer>
            <LinkContainer to={`${match.url}/components`}>
			    <reactBS.ListGroupItem>				
					Components			
			    </reactBS.ListGroupItem>
            </LinkContainer>
            <LinkContainer to={`${match.url}/props-v-state`}>
			    <reactBS.ListGroupItem>				
					props v. state				
			    </reactBS.ListGroupItem>
            </LinkContainer>
		</reactBS.ListGroup>

		<Route path={`${match.url}/:topicId`} component={Topic}/>
		<Route exact path={match.url} render={()=>(
			<h3>Please select a topic</h3>
		)}/>
	</div>
);

const Home = () => (
	<div>
		<reactBS.PageHeader>
			Home
		</reactBS.PageHeader>
	</div>
);

const About = () => (
	<div>
		<reactBS.Well>
			About
		</reactBS.Well>
	</div>
);


export default class RouterNav extends Component {
    generateRoute = (pth, component) => {
        let ex = (component === Home || component === StartPage);
        return (
            <Route path={pth} component={component} key={pth} exact={ex} />
        );
    }
    generateLink = (pth, txt, index) =>{
        const elements = {
            link: LinkContainer,
            indexLink: IndexLinkContainer,
        };
        let linkElementKey = txt !== "" && txt !== undefined ? 'link' : 'indexLink';
        let LinkElement = elements[linkElementKey];
        let elementText = (txt && txt.trim && txt.trim().length) ? txt : "home";
        return (
            <LinkElement to={pth} key={index}>
                <reactBS.ListGroupItem>
                    {elementText}
                </reactBS.ListGroupItem>
            </LinkElement>
        );            
    }
    render(){
        let generateLink = this.generateLink;
        let generateRoute = this.generateRoute;
        let routesToComponents = {
            "/":StartPage,
            "/app":StartPage,
            "/app/about":About,
            "/app/topics":Topics,
            "/app/start-page":StartPage,
            "/app/add-player": AddPlayer,
            "/app/add-frisbee": AddFrisbee,
            "/app/add-game": AddGameMain,
            "/app/list-game": ListGames,
            "/app/list-player": ListPlayer,
        };
        let localRoutes = Object.keys(routesToComponents).map((key, idx) => {
            return generateRoute(key, routesToComponents[key]);            
        });
        let localLinks = Object.keys(routesToComponents).map((itm, idx) => {
            return generateLink(itm, itm.split('/app/')[1], idx);
        });

        return (
            <Router>
                <div>
                    <reactBS.ListGroup>
                        {localLinks}
                    </reactBS.ListGroup>
                    <hr />                                    
                    {localRoutes}
                </div>
            </Router>
        );
    }
}
/* jshint ignore:end */