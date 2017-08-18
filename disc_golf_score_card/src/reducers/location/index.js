import startingPosition from './starting-position';
import currentPosition from './current-position';
import throws from './throws';
import loaded from './loaded';

import { combineReducers } from 'redux';

const location = combineReducers({
    currentPosition, 
    startingPosition,
    throws,
    loaded,
});

export default location