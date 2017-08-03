import {UPDATE_TOTAL, RESET_TOTALS} from '../../actions';

const initialState = {};

const totalScores = (state = initialState, action) => {
    switch (action.type) {
        case RESET_TOTALS:
            return initialState;
        case UPDATE_TOTAL:
            const name = action.payload.player.name;
            const score = action.payload.score;
            const scoreToAdd = {
                [name]: (state[name] || 0) + score
            };
            return {
                ...state,
                ...scoreToAdd
            };
        default:
            return state;
    }
};

export default totalScores