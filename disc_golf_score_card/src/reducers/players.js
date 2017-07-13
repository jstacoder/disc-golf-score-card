import * as axios from 'axios';
//import { SELECT_PLAYER, LOAD_PLAYERS,  TOGGLE_PLAYER_NAME_COLOR, LOAD_PLAYER_NAME_COLORS } from '../actions';

import { UPDATE_SCORE, CHANGE_PLAYER } from '../actions';

const FETCH_PLAYERS = 'FETCH_PLAYERS';
const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';

const initialPlayersState = {
    playersList: {
        players: [],
        scores: {},
        currentPlayerIndex:0,
        error: null,
        loading: false,
    }
};

export default function players(state = initialPlayersState, action){
    let newState = {...state};

    switch (action.type){
        case CHANGE_PLAYER:
            let currIdx = newState.playersList.currentPlayerIndex;
            if(currIdx == action.payload.players.length - 1){
                newState.playersList.currentPlayerIndex = 0;
            }else{
                newState.playersList.currentPlayerIndex++;
            }            
            return newState;
        case FETCH_PLAYERS:
            newState.playersList.loading = true;
            return newState;

        case FETCH_PLAYERS_SUCCESS:
            action.payload.data.map(itm =>{
                newState.playersList.players.push(itm);
                newState.playersList.scores[itm.name] = {};
            });
            newState.playersList.loading = false;
            return newState;

        case UPDATE_SCORE:
            newState
            .playersList
            .scores[
                action
                .payload
                .player
                .name
            ][
                action
                .payload
                .hole_id] = 
            action
            .payload
            .score;       
            return newState;
        default:
            return state;
    }
}
