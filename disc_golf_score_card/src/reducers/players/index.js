import { combineReducers } from 'redux';

import players from './players';
import scores from './scores';
import totalScores from './total-scores';
import loading from './loading';

const playersReducer = combineReducers({
    players,
    scores,
    totalScores,
    loading,
});

export default playersReducer