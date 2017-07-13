import { LOAD_PLAYER_NAME_COLORS } from '../actions';

const initialState = {
};

export default function playerNameColor(state = initialState, action){
    switch(action.type){
        case LOAD_PLAYER_NAME_COLORS:
            return action.playerNameColors;
        default:
            return state;
    }
}
