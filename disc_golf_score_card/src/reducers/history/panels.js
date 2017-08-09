import { ADD_PANEL } from '../../actions/history';

const initialState = [];

const panels = (state = initialState, action) =>{
    switch(action.type){
        case ADD_PANEL:
            return [...state, action.payload.panel];
        default:
            return state;
    }
};

export default panels