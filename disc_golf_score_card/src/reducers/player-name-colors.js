import { LOAD_PLAYER_NAME_COLORS } from '../actions';

const initialState = {
    data: {}
};

export default function playerNameColorReducer(state = initialState, action){
    switch(action.type){
        case LOAD_PLAYER_NAME_COLORS:
            return {
                ...state, data: action.payload.data
            };
            default:
                return state;
    }
}
