import { 
    SELECT_COURSE 
} from '../actions';

const FETCH_COURSES = 'FETCH_COURSES'; 
const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
const FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE';  

const initialCoursesState = {
    coursesList: {
        courses: [],
        error: null,
        loading: false,
    }
};

export default function courses(state = initialCoursesState, action){
    let newState = {...state};
    switch(action.type){
        case FETCH_COURSES:
            newState.loading = true;
            return newState;
        case FETCH_COURSES_SUCCESS:
            newState.loading = false;
            newState.error = null;
            action.payload.data.map(itm =>{
                newState.coursesList.courses.push(itm);
            });
            return newState;
        case FETCH_COURSES_FAILURE:
            newState.loading = false;
            newState.error = 'Error loading courses';
            return newState;
        default:
            return state;
    }
}