import { SET_GAME_START, UNSET_GAME_START } from '../actions';

const initialState = false;


export default reducer = (state = initialState, action = {}) =>{
    let newState;
    switch(action.type){
        case SET_GAME_START:
            newState = true;
            break
        case UNSET_GAME_START:
            newState = false;
            break
        default:
            newState = state;
            break
    }
    return newState;
}
