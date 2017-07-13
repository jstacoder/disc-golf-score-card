import { combineReducers } from 'redux';
import players from './players';
import getPlayers from './player';
import courses from './courses';
import playerNameColor from './player-name-colors';
import gameData from './current-game-data';
import { routerReducer as router } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

const rootReducer = combineReducers({
    player: getPlayers,
    players: players,
    courses: courses,
    playerNameColor: playerNameColor,
    gameData: gameData,
    router,
    reduxAsyncConnect,
});

export default rootReducer;