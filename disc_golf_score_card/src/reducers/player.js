import * as axios from 'axios';

export const LOADING_PLAYERS = 'LOADING_PLAYERS';
export const LOADED_PLAYERS = 'LOADED_PLAYERS';
export const LOADING_FAILED = 'LOADING_FAILED';

export function getPlayers(){
    return dispatch => {
        console.log("LOADING PLAYERS");
        axios.get('/api/player')
            .then(res =>{
                const people = res.data.map(person => {
                    person.selected = false;
                    return person;
                });
                dispatch(getPlayersAsync(people));
            });
    }
}

function getPlayersAsync(people){
    return {
        type: LOADING_PLAYERS,
        payload: people,
    };
}
