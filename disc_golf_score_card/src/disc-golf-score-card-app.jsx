import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DiscGolfScoreCardRoutes from './disc-golf-score-card';
import RedirectRoutes from './redirect-routes';
import { ConnectedRouter as Router } from 'react-router-redux';
import * as Actions from './actions';
import { history } from './store/configureStore';
import { ReduxAsyncConnect, asyncConnect } from 'redux-async-connect';

const renderWithRedux = (props) => (
    <ReduxAsyncConnect 
        {...props} 
        helpers="" 
        filter={item => !item.deferred} />
);

class DiscGolfScoreCardApp extends Component {
    render(){
        console.log(history);
        const needsRedirect = this.props.redirect.needsRedirect;
        const RouteComponent = (needsRedirect && history.location.pathname.split('/app/')[1] !== "")
            ? RedirectRoutes : DiscGolfScoreCardRoutes;

        return (
             <Router history={history} render={renderWithRedux}>
                <div>
                    <RouteComponent {...this.props} />        
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
    };
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscGolfScoreCardApp);
