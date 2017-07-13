import * as axios from 'axios';

export const LOAD_COURSES = 'LOAD_COURSES';
export const LOAD_PLAYERS = 'LOAD_PLAYERS';
export const TOGGLE_PLAYER_NAME_COLOR = 'TOGGLE_PLAYER_NAME_COLOR';
export const ADD_PLAYER_TO_GAME = 'ADD_PLAYERS_TO_GAME';
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const SELECT_COURSE = 'SELECT_COURSE';
export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const LOAD_PLAYER_NAME_COLORS = 'LOAD_PLAYER_NAME_COLORS';
export const REQUEST_COURSES = 'REQUEST_COURSES';
export const START_GAME = 'START_GAME';

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


export function selectCourse(course){
    return {
        type: SELECT_COURSE,
        course
    };
}
export function requestPlayers(){
    return {
        type: REQUEST_PLAYERS,
    };
}   
export function requestCourses(){
    return {
        type: REQUEST_COURSES,
    };
}
export function startGame(course, players){
    return {
        type: START_GAME,
        course,
        players,
    };
}
export function addPlayerToGame(player){
    return {
        type: ADD_PLAYER_TO_GAME,
        player 
    };
}
export function startNewGame(course, players){
    return {
        type: START_NEW_GAME,
        course,
        players,
    }
}
export function togglePlayerNameColor(player){
    return {
        type: TOGGLE_PLAYER_NAME_COLOR,
        player
    };
}
export function loadPlayerNameColors(players){
    const playerNameColors = {};
    players.map((player)=>{
        playerNameColors[player.name] = 'text-danger';
    });
    return {
        type: LOAD_PLAYER_NAME_COLORS,
        playerNameColors,
    };
}
export function loadPlayers(players = []){
    console.log('loading players')    
    return {
        type: LOAD_PLAYERS,
        players,
    };
}
export function selectPlayer(player){
    console.log("selecting: ",player);
    return {
        type: SELECT_PLAYER,
        player
    };
}
export function loadCourses(){
    const courses = axios.get('/course');
    return {
        type: LOAD_COURSES,
        courses,
    };
}
