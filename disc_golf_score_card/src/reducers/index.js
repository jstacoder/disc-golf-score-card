import { combineReducers } from 'redux';
import players from './players';
import getPlayers from './player';
import player from './player';
import courses from './courses';
import playerNameColor from './player-name-colors';
import gameData from './current-game-data';
import currentTurn from './current-turn';
import started from './started';
import gameHistory from './game-history';
import { routerReducer as router } from 'react-router-redux';
//import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import redirect from './redirect-reducer';
import * as storage from 'redux-storage';

const rootReducer = storage.reducer(
    combineReducers({
        gameHistory,
        players,
        courses,
        playerNameColor,
        gameData,
        router,
        currentTurn,
        redirect,
        started,
        player,
        // reduxAsyncConnect,
    })
);

export default rootReducer; 