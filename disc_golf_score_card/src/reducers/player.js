import { ADD_PLAYER, ADD_PLAYER_PENDING, ADD_PLAYER_FULFILLED } from '../actions';

const initialState = {
    player: {
        name: '',
        frisbees: [],
    },
    loading : false
};

const playerReducer = (state = initialState, action = {}) =>{
    let newState = {...state};
    switch(action.type){
        case ADD_PLAYER_PENDING:    
            newState.loading = true;
            return newState;
        case ADD_PLAYER_FULFILLED:
            newState.loading = false;
            return newState;
        default:
            return newState;
    }
}

export default playerReducer;