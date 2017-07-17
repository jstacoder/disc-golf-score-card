import { LOAD_PLAYER_NAME_COLORS, TOGGLE_PLAYER_NAME_COLOR } from '../actions';

const initialState = {};

export default function playerNameColor(state = initialState, action){
    let newState = {...state};
    switch(action.type){
        case LOAD_PLAYER_NAME_COLORS:
            return {...newState, ...action.playerNameColors};
        case TOGGLE_PLAYER_NAME_COLOR:
            newState[action.player.name] = 
                newState[action.player.name] == 
                    'danger' ? 'danger' :
                'success';
            return newState;
        default:
            return newState;
    }
}
