import { CHANGE_HOLE, CHANGE_PLAYER, START_NEW_GAME } from '../actions';

const initialState = {
    currentPlayerIndex: 0,
    currentHoleId:null,
    lastHole:false,
};

export default function currentTurn(state = initialState, action = {}){
    let newState = {...state};

    switch(action.type){
        case START_NEW_GAME:
            newState.currentHoleId = action.payload.course.holes[0].id;
            return newState;
        case CHANGE_HOLE:
            if(newState.lastHole){
                return newState;
            }
            if(action.hole_id === null){
                ++newState.currentHoleId;
            }else{
                newState.currentHoleId = action.hole_id;
            }
            if(newState.currentHoleId == action.payload.holes.length-1){
                newState.lastHole = true;
            }
            return newState;

        case CHANGE_PLAYER:
            let currIdx = newState.currentPlayerIndex;
            if(currIdx == action.payload.players.length - 1){
                newState.currentPlayerIndex = 0;
            }else{
                newState.currentPlayerIndex++;
            }
            return newState;
        default:
            return newState;
    }
}
