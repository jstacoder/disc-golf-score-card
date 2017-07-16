/* jshint esversion: 6 */
/* jshint moz: true */
import { 
    SELECT_PLAYER, SELECT_COURSE, START_NEW_GAME, 
    START_NEW_GAME_PENDING, START_NEW_GAME_FULFILLED,
    SET_GAME_START,
} from '../actions';

const initialState = {
        players: [],
        course: null,
        holesById:{},
        game_id: null,
        game_started: false,
        score_card_id: null,
};

export default function gameData(state = initialState, action){
    let newState = {...state};    
    switch(action.type){
        case SET_GAME_START:
            newState.game_started = true;            
            break;
        case START_NEW_GAME:
            console.log("PAYLOAD: ", action);            
            break;
        case START_NEW_GAME_FULFILLED:
            console.log("PAYLOAD: ", action);            
            newState.score_card_id = action.payload.data.score_card;
            newState.game_id = action.payload.data.game;            
            break;
        case SELECT_PLAYER:
            let playerIdx = newState.players.indexOf(action.player);
            if(playerIdx == -1){
                newState.players.push(action.player);
            }else{
                newState.players.splice(playerIdx, 1);
            }
            break;
        case SELECT_COURSE:    
                newState.course = action.course;     
                newState.course.holes.map((hole, idx) =>{
                    newState.holesById[hole.id] = idx;
                });
            break;
        default:
            break;    
    }
    return newState;
}