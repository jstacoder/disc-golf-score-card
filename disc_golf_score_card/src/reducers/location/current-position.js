import { SET_CURRENT_POSITION, STARTING_LOCATION_REQUEST, FINISHED_LOCATION_REQUEST } from '../../actions/position';

const initialState = { position : {}};

const currentPosition = (state = initialState, action) =>{
    switch(action.type){
        case SET_CURRENT_POSITION:
            const { latitude, longitude } = action.payload.coords;
            const rtn =  { position: { latitude, longitude } };
            return rtn;
        default:
            return state;
    }
};

export default currentPosition