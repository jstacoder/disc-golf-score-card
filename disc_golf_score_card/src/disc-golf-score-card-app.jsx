import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DiscGolfScoreCardRoutes from './disc-golf-score-card';
import RedirectRoutes from './redirect-routes';
import { ConnectedRouter as Router } from 'react-router-redux';
import * as Actions from './actions';
import { history } from './store/configureStore';
import CurrentGamePage from './components/game/current-game-page';
//import { ReduxAsyncConnect, asyncConnect } from 'redux-async-connect';

// const renderWithRedux = (props) => (
//     <ReduxAsyncConnect 
//         {...props} 
//         helpers="" 
//         filter={item => !item.deferred} />
// );

class DiscGolfScoreCardApp extends Component {
    render(){
        console.log(history);
        const needsRedirect = history.location.pathname === '/';
        //const RouteComponent = (needsRedirect && history.location.pathname.split('/app/')[1] !== "")
        //    ? RedirectRoutes : DiscGolfScoreCardRoutes;
        const RouteComponent =  needsRedirect ? Redirect : DiscGolfScoreCardRoutes;
        let routeArgs = {};
        if(needsRedirect){
            routeArgs.to = '/app';
        }
        return (
             <Router history={history}>
                <div>
                    <RouteComponent {...this.props} {...routeArgs} />        
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state){
    console.log(state); 
    return {
        //player: state.player,
        players: state.players,
        courses: state.courses,
        playerNameColor: state.playerNameColor,
        gameData: state.gameData,
        currentTurn: state.currentTurn,
        redirect: state.redirect,
        started: state.started,
        player: state.player,
    };
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscGolfScoreCardApp);
