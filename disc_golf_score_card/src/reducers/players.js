import * as axios from 'axios';
import { SELECT_PLAYER, LOAD_PLAYERS } from '../actions';

const initialState = {
    data: []
};

export default function players(state = initialState, action){
    switch (action.type){
        case LOAD_PLAYERS:
            return {
               ...state, data: action.payload.data
            };        
        default:
            return state;
    }
}
