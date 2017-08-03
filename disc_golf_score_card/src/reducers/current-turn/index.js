import turnNumber from './turn-number';
import currentPlayerIndex from './current-player-index';
import currentHoleId from './current-hole-id'; 
import currentStrokes from './current-strokes';
import { combineReducers } from 'redux';

const currentTurnReducer = combineReducers({
	currentPlayerIndex,
	currentHoleId,
	turnNumber,
	currentStrokes,
});
export default currentTurnReducer;
