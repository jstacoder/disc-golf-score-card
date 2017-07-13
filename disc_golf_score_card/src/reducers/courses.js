import { LOAD_COURSES, SELECT_COURSE } from '../actions';

const initialCoursesState = [];

export default function courses(state = initialCoursesState, action){
    let newState = [...state];
    switch(action.type){
        case LOAD_COURSES:
            action.courses && action.courses.data && action.courses.data.map((itm)=>{
                newState.push(itm);
            });
            return newState;
        default:
            return state;
    }
}