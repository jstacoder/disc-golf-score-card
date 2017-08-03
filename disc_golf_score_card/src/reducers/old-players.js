import * as axios from 'axios';
import { REMOVE_PLAYER, ADD_PLAYER_FULFILLED, SELECT_COURSE, SELECT_PLAYER, RESET_GAME_DATA, UPDATE_TOTAL, CALCULATE_SCORE, UPDATE_SCORE, CHANGE_PLAYER, ADD_HOLE_SCORE_FULFILLED, ADD_HOLE_SCORE_PENDING } from '../actions';

const FETCH_PLAYERS = 'FETCH_PLAYERS';
const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';

const initialPlayersState = {
        players: [],
        scores: {},
        error: null,
        loading: false,
        totalScores:{}
};

const players = (state = initialPlayersState, action) =>{    
    switch (action.type){
        case REMOVE_PLAYER:            
            return {
                ...state,
                players: 
                    state.players.filter(player =>( player.id != action.payload.player.id))
            };
        case ADD_PLAYER_FULFILLED:
            const player = action.payload.data.result;
            return {
                ...state,
                players: [
                    ...state.players,
                    player
                ]
            };
        case SELECT_PLAYER:
            return {
                ...state,
                scores: {
                    ...state.scores,
                    [action.player.name] : {}                        
                }
            };        
        case SELECT_COURSE:
            let scores = {};
            Object.keys(state.scores).map((itm, idx) =>{
                scores[itm] = {};
            });
            action.course.holes.map((hole, hidx) =>{
                Object.keys(state.scores).map((itm, idx) =>{                    
                    scores[itm][hidx] = 0;
                });
            });
            return {
                ...state,
                scores,
            };                                    
        case RESET_GAME_DATA:
            return {...initialPlayersState};

        case UPDATE_TOTAL:
            const name = action.payload.player.name;
            const score = action.payload.score;
            return {
                ...state,
                totalScores: {
                    ...state.totalScores,
                    [name] : 
                        (state.totalScores[name] || 0) + score,
                }                
            };            
        case FETCH_PLAYERS:
            return {
                ...state,
                loading: true,
            };            
        case FETCH_PLAYERS_SUCCESS:
            let addedPlayers = [];            
            let newScores = {};
            action.payload.data.map(itm =>{
                let addPlayer = true;
                for(let i = 0; i < state.players.length; i++){
                    const curr = state.players[i];
                    if(curr.id == itm.id){
                        addPlayer = false;
                    }
                }
                if(addPlayer){                    
                    addedPlayers.push(itm);
                    newScores[itm.name] = {};
                }                
            });
            return {
                ...state,
                players: [
                    ...state.players,
                    ...addedPlayers
                ],
                scores: {
                    ...state.scores,
                    ...newScores,
                },
                loading: false                
            };            
        case ADD_HOLE_SCORE_PENDING:            
            return state;
        case ADD_HOLE_SCORE_FULFILLED:
            return state;
        case UPDATE_SCORE:
            return {
                ...state,
                scores: {
                    ...state.scores,
                    [action.payload.player.name] : {
                        ...state.scores[action.payload.player.name],
                        [action.payload.hole_id] : action.payload.score
                    }
                }
            };            
        default:
            return state;
    }
};

export default players
