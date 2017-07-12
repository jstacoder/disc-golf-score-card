import { combineReducers } from 'redux';
import PlayerReducer from './players';
import courseReducer from './courses';
import playerNameColorReducer from './player-name-colors';
import gameDataReducer from './current-game-data';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    players: PlayerReducer,
    courses: courseReducer,
    playerNameColor: playerNameColorReducer,
    gameData:gameDataReducer,
    router:routerReducer,
});

export default rootReducer;
