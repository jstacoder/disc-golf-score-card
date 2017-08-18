import { ADD_PLAYER_TO_THROWS, ADD_HOLE_TO_PLAYER, ADD_THROW_TO_HOLE } from '../../actions/position';

const initialState = {}

const throws = (state = initialState, action) =>{
    const player = action.payload && action.payload.name;
    const hole = action.payload && action.payload.hole;    
    switch(action.type){        
        case ADD_PLAYER_TO_THROWS:
            return { ...state, [player] : {} };
        case ADD_HOLE_TO_PLAYER:                        
            return { ...state, [player] : {...state[player], [hole] : [] }  };
        case ADD_THROW_TO_HOLE:            
            const distance = action.payload.distance;
            const strokes = action.payload.strokes-1 || 0;
            const holeArr = (state[player] && state[player][hole]) || [distance];
            console.log(state, holeArr);
            return { ...state, [player] : {...state[player], [hole] : [ ...holeArr.filter( (itm, idx) =>{
                return idx !== strokes;
            }), distance ] } };
        default:
            return state;
    }
}

export default throws