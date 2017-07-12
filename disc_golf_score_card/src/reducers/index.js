import { combineReducers } from 'redux';
import PlayerReducer from './players';

const rootReducer = combineReducers({
    players: PlayerReducer
});

export default rootReducer;
