import { combineReducers } from 'redux';
import PlayerReducer from './players';
import courseReducer from './courses';
import playerNameColorReducer from './player-name-colors';
import gameDataReducer from './current-game-data';

const rootReducer = combineReducers({
    players: PlayerReducer,
    courses: courseReducer,
    playerNameColors: playerNameColorReducer,
    gameData:gameDataReducer,
});

export default rootReducer;
