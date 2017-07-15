import * as axios from 'axios';
//import { SELECT_PLAYER, LOAD_PLAYERS,  TOGGLE_PLAYER_NAME_COLOR, LOAD_PLAYER_NAME_COLORS } from '../actions';

import { UPDATE_SCORE, CHANGE_PLAYER } from '../actions';

const FETCH_PLAYERS = 'FETCH_PLAYERS';
const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';

const initialPlayersState = {   
        players: [],
        scores: {},        
        error: null,
        loading: false,    
};

export default function players(state = initialPlayersState, action){
    let newState = {...state};

    switch (action.type){       
        case FETCH_PLAYERS:
            newState.loading = true;
            return newState;

        case FETCH_PLAYERS_SUCCESS:
            action.payload.data.map(itm =>{
                newState.players.push(itm);
                newState.scores[itm.name] = {};
            });
            newState.loading = false;
            return newState;

        case UPDATE_SCORE:
            newState.scores[action.payload.player.name][action.payload.hole_id] = action.payload.score;       
            console.log(newState.scores[action.payload.player.name][action.payload.hole_id]);
            return newState;
        default:
            return state;
    }
}
