import { 
    SELECT_COURSE,
    ADD_COURSE,
    REMOVE_COURSE,
    REMOVE_COURSE_REQUEST_ERROR,
    REMOVE_COURSE_REQUEST_FULFILLED,
    REMOVE_COURSE_REQUEST_PENDING
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
        case REMOVE_COURSE:
            const index = newState.coursesList.courses.indexOf(action.payload.course);
            newState.coursesList.courses.splice(index, 1);
            return newState;
        case ADD_COURSE:
            newState.coursesList.courses.push(action.payload.course);
            return newState;
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