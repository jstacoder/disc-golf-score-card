import { ADD_STROKE, REMOVE_STROKE, SET_STROKE, RESET_STROKES } from '../../actions/current-turn';

const initialState = 0;

const currentStrokes = (state = initialState, action) =>{
	switch(action.type){
		case ADD_STROKE:
			return state + 1;
		case REMOVE_STROKE:
			return state - 1;
		case SET_STROKE:
			console.log(action);
			return action.payload.stroke || 0;
		case RESET_STROKES:
			return 0;
		default:
			return state;
	} 
};

export default currentStrokes
