import { SET_EDITING, UNSET_EDITING } from '../actions/editing';

const initialState = {};


const editing = (state = initialState, action) =>{
    switch(action.type){
        case SET_EDITING:
            return {...state, [action.payload.elementId] : true };
        case UNSET_EDITING:
            return {...state, [action.payload.elementId] : false };
        default:
            return state;
    }
};

export default editing