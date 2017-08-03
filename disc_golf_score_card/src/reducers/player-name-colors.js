import { LOAD_PLAYER_NAME_COLORS, TOGGLE_PLAYER_NAME_COLOR } from '../actions';

const initialState = {};

const playerNameColor = (state = initialState, action) =>{    
    switch(action.type){
        case LOAD_PLAYER_NAME_COLORS:
            return {...action.playerNameColors};
        case TOGGLE_PLAYER_NAME_COLOR:
            const newColor = state[action.player.name] == 'danger' ? 'success' : 'danger';                
            return {
                ...state,
                [action.player.name] : newColor
            };
        default:
            return state;
    }
};

export default playerNameColor
