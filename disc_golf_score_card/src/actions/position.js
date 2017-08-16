export const SET_STARTING_POSITION = 'SET_STARTING_POSITION';
export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';
export const STARTING_LOCATION_REQUEST = 'STARTING_LOCATION_REQUEST';
export const FINISHED_LOCATION_REQUEST = 'FINISHED_LOCATION_REQUEST';


const getPos = (opts) =>{ 
    return new Promise( (resolve, reject) =>{
        navigator.geolocation.getCurrentPosition( (position) =>{
            let  { latitude, longitude } = position.coords; 
            console.log('resolving', position);
            resolve( position );
        }, () =>{ reject('error'); });
    });
};

export const setPos = (start = true) => {
    return (dispatch, getState) =>{
        console.log(dispatch);
        dispatch({
            type: STARTING_LOCATION_REQUEST
        });

        return getPos().then( ({ coords }) =>{
            const position = start ? 'STARTING' : 'CURRENT';
            const action_type =  `SET_${position}_POSITION`;
            dispatch({
                type: action_type,
                payload: {
                    coords
                }
            });
            console.log(coords);
            return coords;
        }).then(() =>{
            dispatch({
                type: FINISHED_LOCATION_REQUEST
            });
        });
    }
};


// export const requestPosition = () => (getState, dispatch) =>{
//     return dispatch({ type: 'REQUEST_POSITION', payload: { position : navigator.geolocation.getCurrentPosition( pos =>(Promise.resolve(pos)))}});
// };

// export const setPosition = (start = true, { coords }) => (getState, dispatch){
//     const posType = start ? 'STARTING' : 'CURRENT';
//     return dispatch({
//         type: `SET_${posType}_POSITION`,
//         payload: {
//             coords
//         }
//     });
// };
