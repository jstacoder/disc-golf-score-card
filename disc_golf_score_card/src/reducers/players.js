import * as axios from 'axios';
import { SELECT_PLAYER, LOAD_PLAYERS,  TOGGLE_PLAYER_NAME_COLOR, LOAD_PLAYER_NAME_COLORS } from '../actions';

const initialPlayersState = [];

export default function players(state = initialPlayersState, action){
    let newState = [...state];
    switch (action.type){
        case LOAD_PLAYERS:
            action.players.forEach((itm)=>{
                newState.push(itm);
            });
            return newState;
        case SELECT_PLAYER:
            let player = action.player;
            state.map((itm, idx) => {
                if(itm == player){
                    itm.selected = true;
                }
                newState.push(itm);
            });             
            return [...newState];            
        default:
            return state;
    }
}
