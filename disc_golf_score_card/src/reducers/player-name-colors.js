import { LOAD_PLAYER_NAME_COLORS } from '../actions';

const initialState = {
    
};

export default function playerNameColorReducer(state = initialState, action){
    switch(action.type){
        case LOAD_PLAYER_NAME_COLORS:
            return {
                ...state, 
                ...action.playerNameColors
            };
        default:
            return state;
    }
}
