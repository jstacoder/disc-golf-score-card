/* jshint esversion: 6 */
/* jshint moz: true */
import { SELECT_PLAYER, SELECT_COURSE, START_NEW_GAME } from '../actions';

const initialState = {
        players: [],
        course: null,
        holesById:{},
        game_id: null,
        score_card_id: null,
};

export default function gameData(state = initialState, action){
    let newState = {...state};    
    switch(action.type){
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