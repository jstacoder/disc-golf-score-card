import { LOAD_COURSES, SELECT_COURSE } from '../actions';

export default function courseReducer(state = [], action){
    switch(action.type){
        case LOAD_COURSES:
            return action.courses;
        default:
            return state;
    }
}