import { combineReducers } from 'redux';
import active from './active';
import panels from './panels';

const historyData = combineReducers({
    active,
    panels,
});

export default historyData