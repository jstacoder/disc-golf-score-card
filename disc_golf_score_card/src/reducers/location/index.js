import startingPosition from './starting-position';
import currentPosition from './current-position';
import loaded from './loaded';

import { combineReducers } from 'redux';

const location = combineReducers({
    currentPosition, 
    startingPosition,
    loaded,
});

export default location