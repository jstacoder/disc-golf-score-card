import { SET_HOLE } from '../../actions/current-turn';

const initialState = 0;

const currentHoleId = (state = initialState, action) =>{
	switch(action.type){
		case SET_HOLE:
			return action.payload;
		default:
			return state;
	}
};

export default currentHoleId

