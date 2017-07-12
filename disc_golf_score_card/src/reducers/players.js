import * as axios from 'axios';
import { SELECT_PLAYER, LOAD_PLAYERS,  TOGGLE_PLAYER_NAME_COLOR, LOAD_PLAYER_NAME_COLORS } from '../actions';


export default function players(state = [], action){
    switch (action.type){
        case LOAD_PLAYERS:
            return action.players;
        case SELECT_PLAYER:
            let player = action.player;
            let newState = [] ;
            state.map((itm, idx) => {
                if(itm == player){
                    itm.selected = true;
                }
                newState.push(itm);
            });             
            return {
                ...state, ...newState
            };                
        default:
            return state;
    }
}
