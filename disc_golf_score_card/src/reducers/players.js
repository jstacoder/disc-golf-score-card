import * as axios from 'axios';
import { UPDATE_TOTAL, CALCULATE_SCORE, UPDATE_SCORE, CHANGE_PLAYER, ADD_HOLE_SCORE_FULFILLED, ADD_HOLE_SCORE_PENDING } from '../actions';

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

export default function players(state = initialPlayersState, action){
    let newState = {...state};

    switch (action.type){
        case UPDATE_TOTAL:
            const name = action.payload.player.name;
            const score = action.payload.score;

            newState.totalScores = {
                [name] :
                (newState.totalScores[name] || 0) + score,
                ...newState.totalScores
            };
            return newState
        case FETCH_PLAYERS:
            newState.loading = true;
            return newState;

        case CALCULATE_SCORE:
            let currScore = Oject.values(state.scores[action.payload.player.name]).reduce((a,b) =>(
                 a + b
            ));
            let currPar = action.payload.holes.reduce((a,b) =>(
                a.par + b.par
            ));
            newState.totalScores[action.payload.player.name] = currScore - currPar;
            return newState;

        case FETCH_PLAYERS_SUCCESS:
            action.payload.data.map(itm =>{
                newState.players.push(itm);
                newState.scores[itm.name] = {};
            });
            newState.loading = false;
            return newState;

        case ADD_HOLE_SCORE_PENDING:
            console.log('pending adding score');
            return newState;

        case ADD_HOLE_SCORE_FULFILLED:
            console.log('finished adding score');
            return newState;

        case UPDATE_SCORE:
            newState.scores[action.payload.player.name][action.payload.hole_id] = action.payload.score;
            return newState;
        default:
            return state;
    }
}
