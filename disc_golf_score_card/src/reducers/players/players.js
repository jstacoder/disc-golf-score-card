import { 
    REMOVE_PLAYER, ADD_PLAYER_FULFILLED, SELECT_COURSE, 
    SELECT_PLAYER, RESET_GAME_DATA, UPDATE_TOTAL, 
    CALCULATE_SCORE, UPDATE_SCORE, CHANGE_PLAYER, 
    ADD_HOLE_SCORE_FULFILLED, ADD_HOLE_SCORE_PENDING 
} from '../../actions';

const initialState = [];

const FETCH_PLAYERS = 'FETCH_PLAYERS';
const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';

const players = (state = initialState, action) =>{    
    switch (action.type){
        case REMOVE_PLAYER:            
            return state.filter(player =>( player.id != action.payload.player.id))
        case ADD_PLAYER_FULFILLED:            
            return [
                ...state, 
                action.payload.data.result,
            ];                                            
        case RESET_GAME_DATA:
            return initialState;
        case FETCH_PLAYERS_SUCCESS:
            let addedPlayers = [];            
            let newScores = {};
            action.payload.data.map(itm =>{
                let addPlayer = true;
                for(let i = 0; i < state.length; i++){
                    const curr = state[i];
                    if(curr.id == itm.id){
                        addPlayer = false;
                    }
                }
                if(addPlayer){                    
                    addedPlayers.push(itm);                    
                }                
            });
            return [
                    ...state,
                    ...addedPlayers
            ];                                          
        default:
            return state;
    }
};

export default players
