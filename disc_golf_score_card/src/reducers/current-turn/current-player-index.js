import { CHANGE_PLAYER, SET_PLAYER } from '../../actions/current-turn';

const initialState = 0;

const currentPlayerIndex = (state = initialState, action) =>{
	switch(action.type){
		case CHANGE_PLAYER:
			return action.payload.index;
		default:
			return state;
	}
};

export default currentPlayerIndex

