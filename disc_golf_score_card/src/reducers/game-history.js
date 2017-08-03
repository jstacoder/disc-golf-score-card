import { LOAD_ALL_GAMES_HISTORY, LOAD_ALL_GAMES_HISTORY_FAILURE, LOAD_ALL_GAMES_HISTORY_SUCCESS, LOAD_GAME_HISTORY, LOAD_GAME_HISTORY_FAILURE, LOAD_GAME_HISTORY_SUCCESS } from '../actions';

const initialState = {
    loading: false,
    games: [],
    currentGame:{
        id:''        
    }
};

const gameHistory = (state = initialState, action = {}) =>{
    switch(action.type){
        case LOAD_ALL_GAMES_HISTORY:
            return { 
                ...state,
                loading: true, 
            };
        case LOAD_ALL_GAMES_HISTORY_SUCCESS:
            return { 
                ...state,
                loading: false, 
                games: [
                    ...state.games, action.payload.data
                ], 
            };
        case LOAD_ALL_GAMES_HISTORY_FAILURE:
            return { 
                ...state,
                loading: false, 
            };
        case LOAD_GAME_HISTORY_FAILURE:
            return { 
                ...state,
                loading: false,     
            };
        case LOAD_GAME_HISTORY:
            return {
                ...state, 
                loading: true,                 
            };
        case LOAD_GAME_HISTORY_SUCCESS:
            return { 
                ...state,
                loading: false,                 
                currentGame: action.payload.data
            };
        default:
            return state;
    }    
};

export default gameHistory