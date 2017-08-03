import { 
    SELECT_COURSE,
    ADD_COURSE,
    ADD_COURSE_REQUEST,
    ADD_COURSE_REQUEST_FULFILLED,
    REMOVE_COURSE,
    REMOVE_COURSE_REQUEST_ERROR,
    REMOVE_COURSE_REQUEST_FULFILLED,
    REMOVE_COURSE_REQUEST_PENDING,
    REMOVE_COURSE_REQUEST,
} from '../actions';

const FETCH_COURSES = 'FETCH_COURSES'; 
const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
const FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE';  

const initialCoursesState = {
    pendingCourses: [],
    coursesList: {
        courses: [],
        error: null,
        loading: false,
    }
};

export default function courses(state = initialCoursesState, action){    
    switch(action.type){
        case REMOVE_COURSE_REQUEST_FULFILLED:            
            return { ...state, 
                coursesList: 
                    {...state.coursesList, 
                        courses: 
                            state.pendingCourses.map(course => (course)),
                        loading: false
                    },
                pendingCourses: [],

            };
        case REMOVE_COURSE:            
            return { ...state,
                coursesList: 
                    {...state.coursesList,                                                                     
                        loading: false
                    },
                pendingCourses: state.coursesList.courses.filter(course => (course != action.payload.course)) 
            };
        case REMOVE_COURSE_REQUEST_PENDING:
            return {...state, 
                coursesList:
                    {...state.coursesList, 
                        loading: true,                    
                    },
                pendingCourses:[]
            };
        case ADD_COURSE_REQUEST:
            return {...state, 
                coursesList:
                    {...state.coursesList, 
                        loading: true
                    }
            };
        case FETCH_COURSES:
            return {...state, 
                coursesList:
                    {...state.coursesList, 
                        loading: true
                    }
            };
        case FETCH_COURSES_SUCCESS:
            return {...state, 
                    coursesList: 
                        {...state.coursesList, 
                                courses: action.payload.data,
                                loading: false,
                        }
            }
        case ADD_COURSE_REQUEST_FULFILLED:
            const course = action.payload.data.result;
            return {...state, 
                    coursesList: 
                        {...state.coursesList, 
                                courses:
                                    [...state.coursesList.courses, course],
                                loading: false,                                
                        }                        
            }
        case FETCH_COURSES_FAILURE:
            return {...state, 
                coursesList:
                    {...state.coursesList, 
                        loading: false,
                        error: action.payload.data
                    }
            };
        default:
            return state;
    }
}