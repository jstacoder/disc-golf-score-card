export const INCREMENT_TURN = 'INCREMENT_TURN';
export const DECREMENT_TURN = 'DECREMENT_TURN';
export const SET_TURN = 'SET_TURN';
export const SET_PLAYER = 'SET_PLAYER';
export const SET_HOLE = 'SET_HOLE';
export const ADD_STROKE = 'ADD_STROKE';
export const REMOVE_STROKE = 'REMOVE_STROKE';
export const SET_STROKE = 'SET_STROKE';
export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const RESET_STROKES = 'RESET_STROKES';

export const changePlayer = index =>({
	type: CHANGE_PLAYER,
	payload:{
		index,
	}
});
export const resetStrokes = () =>({
	type: RESET_STROKES,
});
export const setHole = (hole) =>{
	return (dispatch, getState) =>{
		dispatch({
			type: SET_HOLE,
			payload: hole,
		});
		console.log('inside a thunk');
	};
};
export const addStroke = () =>({
	type: ADD_STROKE,
});
export const removeStroke = () =>({
	type: REMOVE_STROKE,
});
export const setStroke = ({stroke}) =>({
	type: SET_STROKE,
	payload: stroke
});
export const incrementTurn = () =>({
	type: INCREMENT_TURN,
});
export const decrementTurn = () =>({
	type: DECREMENT_TURN,
});
export const setTurn = turn =>({
	type: SET_TURN,
	payload: {
		turn
	}
});
export const setPlayer = player =>({
	type: SET_PLAYER,
	payload: {
		player,
	}
});

