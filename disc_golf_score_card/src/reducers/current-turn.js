import { START_NEW_GAME_FULFILLED, RESET_COUNT, INCREMENT_COUNT, SET_COUNT, DECREMENT_COUNT, CHANGE_HOLE, CHANGE_PLAYER, START_NEW_GAME } from '../actions';
import { actionTypes } from 'redux-localstorage';

const initialState = {
    currentPlayerIndex: 0,
    currentHoleId:null,
    lastHole:false,
    firstHole: false,    
    currentDisplayNumber:0,
    gameOver: false,
};

export default function currentTurn(state = initialState, action = {}){
    let newState = {...state};
    switch(action.type){
      case INCREMENT_COUNT:
            newState.currentDisplayNumber++;
            return newState;

        case DECREMENT_COUNT:
            newState.currentDisplayNumber--;
            return newState;

        case RESET_COUNT:
            newState.currentDisplayNumber = 0;
            return newState;

        case SET_COUNT:
            newState.currentDisplayNumber = action.payload.number;
            return newState;

        case START_NEW_GAME_FULFILLED:
            newState.currentHoleId = action.payload.data.first_hole_id;
            return newState;

        case CHANGE_HOLE:
            if(newState.lastHole === 'true'){
                console.log("END GAME");
                alert('end');
                newState.gameOver = true;
                return newState;
            }
            if(action.payload.hole_id === null){
                if(action.payload.direction === 'next'){
                    newState.currentHoleId++;
                }else{
                    newState.currentHoleId--;
                }                
            }else{
                newState.currentHoleId = action.payload.hole_id;
            }
            if(newState.currentHoleId == action.payload.holes.length-1){
                newState.lastHole = true;
            }
            return newState;

        case CHANGE_PLAYER:
            let currIdx = newState.currentPlayerIndex;
            const direction = action.payload.goToNext ? 'next' : 'last';
            if(direction === 'next'){
                if(currIdx == action.payload.players.length - 1){
                    newState.currentPlayerIndex = 0;
                    if(action.payload.changeHole){
                        newState.currentHoleId++;  
                    }
                }else{
                    newState.currentPlayerIndex++;
                }
            }else{
                if(currIdx == 0){
                    newState.currentPlayerIndex = action.payload.players.length - 1;
                    if(action.payload.changeHole){
                        newState.currentHoleId--;
                    }
                }else{
                    newState.currentPlayerIndex--;
                }
            }
            return newState;

        default:
            return newState;        
    }
}
