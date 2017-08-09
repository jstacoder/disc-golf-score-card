import { SET_ACTIVE } from '../../actions/history';

const initialState = null;

const active = (state = initialState, action) =>{
    switch(action.type){
        case SET_ACTIVE:
            return action.payload.panel;
        default:
            return state;
    }
};

export default active