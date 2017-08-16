import { SET_STARTING_POSITION, STARTING_LOCATION_REQUEST, FINISHED_LOCATION_REQUEST } from '../../actions/position';

const initialState = { position : {}};

const startingPosition = (state = initialState, action) =>{
    switch(action.type){
        case SET_STARTING_POSITION:            
            const { latitude, longitude } = action.payload.coords;
            const rtn =  { position: { latitude, longitude } };
            console.log("setting start" , rtn);
            return rtn;
        default:
            return state;
    }
};

export default startingPosition