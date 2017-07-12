import * as axios from 'axios';

export const SELECT_PLAYER = 'SELECT_PLAYER';
export const LOAD_PLAYERS = 'LOAD_PLAYERS';
export const LOAD_COURSES = 'LOAD_COURSES';


export function loadPlayers(){
    const data = axios.get('/api/player');

    return {
        type: LOAD_PLAYERS,
        payload: data,
    };
}


export function selectPlayer(player = null){
    console.log(player);
    if(player){
        player.selected = !player.selected;
    }
    return {
        type: SELECT_PLAYER,
        payload: player
    };
}