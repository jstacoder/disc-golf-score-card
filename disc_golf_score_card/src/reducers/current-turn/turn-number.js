import { INCREMENT_TURN, DECREMENT_TURN, SET_TURN } from '../../actions/current-turn';

const initialState = 0;

const turnNumber = (state = initialState, action) =>{
	switch(action.type){
		case INCREMENT_TURN:
			return state + 1;
		case DECREMENT_TURN:
			return state -1;
		case SET_TURN:
			return action.payload;
		default:
			return state;
	}
};

export default turnNumber
 
