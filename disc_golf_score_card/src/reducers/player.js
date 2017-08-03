import { ADD_PLAYER, ADD_PLAYER_PENDING, ADD_PLAYER_FULFILLED } from '../actions';

const initialState = {
    player: {
        name: '',
        frisbees: [],
    },
    loading : false
};

const playerReducer = (state = initialState, action = {}) =>{    
    switch(action.type){
        case ADD_PLAYER_PENDING:    
            return {
                ...state,
                loading: true,
            };
        case ADD_PLAYER_FULFILLED:
           return {
                ...state,
                loading: false,
                player: action.payload.data
            };
        default:
            return state;
    }
};

export default playerReducer