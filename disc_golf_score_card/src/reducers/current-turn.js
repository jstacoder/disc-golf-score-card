import { CHANGE_HOLE, CHANGE_PLAYER, START_NEW_GAME } from '../actions';

const initialState = {
    currentPlayerIndex: 0,
    currentHoleId:null,
    lastHole:false,
    lastTurn:false,
};

export default function currentTurn(state = initialState, action = {}){
    let newState = {...state};

    switch(action.type){
        case START_NEW_GAME:
            newState.currentHoleId = action.payload.course.holes[0].id;
            return newState;
        case CHANGE_HOLE:
            if(newState.lastHole === 'true'){
                return newState;
            }
            if(action.payload.hole_id === null){
                newState.currentHoleId++;
            }else{
                newState.currentHoleId = action.payload.hole_id;
            }
            if(newState.currentHoleId == action.payload.holes.length-1){
                newState.lastHole = true;
            }
            return newState;

        case CHANGE_PLAYER:
            let currIdx = newState.currentPlayerIndex;
            if(currIdx == action.payload.players.length - 1){
                     newState.lastTurn = false
            }else if(currIdx == action.payload.players.length - 2){
                     newState.lastTurn = true 
            }else{
                     newState.lastTurn = false 
            }
            if(currIdx == action.payload.players.length - 1){
                newState.currentPlayerIndex = 0;                
            }else{
                newState.currentPlayerIndex++;
                newState.lastTurn = false      
            }
            return newState;
        default:
            return newState;
    }
}
