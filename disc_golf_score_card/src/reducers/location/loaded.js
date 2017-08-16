import { FINISHED_LOCATION_REQUEST } from '../../actions/position';

const initialState = false;

const loaded = (state = initialState, action) =>{
    switch(action.type){
        case FINISHED_LOCATION_REQUEST:
            return true;
        default:
            return state;
    }
};

export default loaded