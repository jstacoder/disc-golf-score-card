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
            return { loading: true, games: state.games, currentGame: state.currentGame};
        case LOAD_ALL_GAMES_HISTORY_SUCCESS:
            return { loading: false, games: action.payload.data, currentGame: state.currentGame};
        case LOAD_ALL_GAMES_HISTORY_FAILURE:
            return { loading: false, games: state.games, currentGame: state.currentGame};
        case LOAD_GAME_HISTORY_FAILURE:
            return { loading: false, games: state.games, currentGame: state.currentGame};
        case LOAD_GAME_HISTORY:
            return { loading: true, games: state.games, currentGame: state.currentGame};
        case LOAD_GAME_HISTORY_SUCCESS:
            return { loading: false, games: state.games, currentGame: action.payload.data};
        default:
            return state;
    }    
}

export default gameHistory