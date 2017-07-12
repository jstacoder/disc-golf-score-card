import { ADD_PLAYERS_TO_GAME, ADD_COURSE_TO_GAME, START_NEW_GAME } from '../actions';

const initialState = {
        players: [],
        course: null,
        game_id: null,
        score_card_id: null,
};

export default function gameDataReducer(state = initialState, action){
    switch(action.type){
        case ADD_PLAYERS_TO_GAME:
            return {
                ...state, players: action.players 
            };
        case ADD_COURSE_TO_GAME:
            return {
                ...state, course: action.course 
            };
        default:
            return state;
    }
}