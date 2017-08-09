import { SET_LOADING, UNSET_LOADING } from '../actions/loading';

const initialState = false;

const loading = (state = initialState, action) =>{
    switch(action.type){
        case SET_LOADING:
            return true;
        case UNSET_LOADING:
            return false;
        default:
            return state;
    }
};

export default loading