import { LOAD_COURSES, SELECT_COURSE } from '../actions';

const initialState = {
    data: []
};

export default function courseReducer(state = initialState, action){
    switch(action.type){
        case LOAD_COURSES:
            return {
                ...state, data: action.payload.data
            };
        default:
            return state;
    }
}