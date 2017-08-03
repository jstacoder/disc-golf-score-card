import { START_NEW_GAME_FULFILLED, RESET_COUNT,SET_GAME_START, INCREMENT_COUNT, SET_COUNT, DECREMENT_COUNT, CHANGE_HOLE, CHANGE_PLAYER, START_NEW_GAME } from '../actions';

const initialState = {
    currentPlayerIndex: 0,
    currentHoleId:0,
    lastHole:false,
    firstHole: false,    
    currentDisplayNumber:0,
    gameOver: false,
};

const currentTurn = (state = initialState, action = {}) =>{    
    switch(action.type){
        case INCREMENT_COUNT:            
            return {
                ...state,
                currentDisplayNumber: state.currentDisplayNumber + 1
            };
        case DECREMENT_COUNT:
            return {
                ...state,
                currentDisplayNumber:  state.currentDisplayNumber - 1
            };
        case RESET_COUNT:
            return {
               ...state,
                currentDisplayNumber: 0
            };
        case SET_COUNT:
            return {
                ...state,
                currentDisplayNumber: action.payload.number
            };
        case SET_GAME_START:
            return {
                ...state,                
                currentHoleId: action.payload.hole_id,
                currentPlayerIndex: 0,
            };        
        case CHANGE_HOLE:
            return {
                ...state,
                currentHoleId: action.payload.hold_id
            };
        case CHANGE_PLAYER:
            return {
                ...state, 
                currentPlayerIndex: action.payload.index,
            };
        default:
            return state
    }
};

export default currentTurn
