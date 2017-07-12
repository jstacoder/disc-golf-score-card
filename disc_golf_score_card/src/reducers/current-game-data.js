import { ADD_PLAYERS_TO_GAME, ADD_COURSE_TO_GAME, START_NEW_GAME } from '../actions';

const initialState = {
    data:{
        players: [],
        course: null,
        game_id: null,
        score_card_id: null,
    }
};

export default function gameDataReducer(state = initialState, action){
    switch(action.type){
        case ADD_PLAYERS_TO_GAME:
            return {
                ...state, data: { players: action.payload.gameData.players }
            };
        case ADD_COURSE_TO_GAME:
            return {
                ...state, data: { course: action.payload.gameData.course }
            };
        case START_NEW_GAME:
            return {
                ...state,
                data:{
                    game_id: action.payload.gameData.game_id,
                    score_card_id: action.payload.gameData.score_card_id,
                }
            };
        default:
            return state;
    }
}