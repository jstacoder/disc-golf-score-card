import { SET_REDIRECT, UNSET_REDIRECT } from '../actions';

const initialState = {
    needsRedirect: false,
};

export default function redirect(state = initialState, action = {}){
    let newState = {...state};

    switch(action.type){
        case SET_REDIRECT:
            newState.needsRedirect = true;
            break;
        case UNSET_REDIRECT:
            newState.needsRedirect = false;
            break;
        default:
            break;
    }
    return newState;
}