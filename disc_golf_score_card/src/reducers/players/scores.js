import { 
    REMOVE_PLAYER, ADD_PLAYER_FULFILLED, SELECT_COURSE, 
    SELECT_PLAYER, RESET_GAME_DATA, UPDATE_TOTAL, 
    CALCULATE_SCORE, UPDATE_SCORE, CHANGE_PLAYER, 
    ADD_HOLE_SCORE_FULFILLED, ADD_HOLE_SCORE_PENDING 
} from '../../actions';

const initialState = {};

const FETCH_PLAYERS = 'FETCH_PLAYERS';
const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';

const scores = (state = initialState, action) =>{
    switch(action.type){
        case SELECT_PLAYER:
            return {
                    ...state,
                    [action.player.name] : {}
            };                    
        case SELECT_COURSE:
            let scores = {};
            Object.keys(state).map((itm, idx) =>{
                scores[itm] = {};
            });
            action.course.holes.map((hole, hidx) =>{
                Object.keys(state).map((itm, idx) =>{                    
                    scores[itm][hidx] = 0;
                });
            });
            return {
                ...state,
                ...scores,
            };            
        case FETCH_PLAYERS_SUCCESS:            
            let newScores = {};
            action.payload.data.map(itm =>{                                            
                if(!(itm.name in state)){
                    newScores[itm.name] = {};
                }
            });               
            return {               
                    ...state,
                    ...newScores,
            };
        case UPDATE_SCORE:
            return {
                ...state,
                [action.payload.player.name] : {
                    ...state[action.payload.player.name],
                        [action.payload.hole_id] : action.payload.score
                }
            };                        
        default:
            return state;
    }
};

export default scores
