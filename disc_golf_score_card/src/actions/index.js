import fetch from 'isomorphic-fetch';

export const SELECT_PLAYER = 'SELECT_PLAYER';


export const SELECT_COURSE = 'SELECT_COURSE';

export function selectCourse(course){
    return {
        type: SELECT_COURSE,
        course
    };
}

export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export function requestPlayers(){
    return {
        type: REQUEST_PLAYERS,
    };
}   

export const LOAD_PLAYER_NAME_COLORS = 'LOAD_PLAYER_NAME_COLORS';

export const REQUEST_COURSES = 'REQUEST_COURSES';
export function requestCourses(){
    return {
        type: REQUEST_COURSES,
    };
}

export const START_GAME = 'START_GAME';
export function startGame(course, players){
    return {
        type: START_GAME,
        course,
        players,
    };
}

// OLD CODE 
import * as axios from 'axios';

// CURRENT GAME ACTIONS
export const ADD_PLAYER_TO_GAME = 'ADD_PLAYERS_TO_GAME';
//export const ADD_COURSE_TO_GAME = 'ADD_COURSE_TO_GAME';
//export const START_NEW_GAME = 'START_NEW_GAME';

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

// PLAYER ACTIONS 
export const LOAD_PLAYERS = 'LOAD_PLAYERS';
export const TOGGLE_PLAYER_NAME_COLOR = 'TOGGLE_PLAYER_NAME_COLOR';

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

export function loadPlayers(){
    console.log('loading players')
    let players = [];
    axios.get('/api/player').then( res => {                
        res.data.forEach(itm => players.push(itm));
        console.log(res, players);
    });

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

// COURSE ACTIONS
export const LOAD_COURSES = 'LOAD_COURSES';


export function loadCourses(){
    let courses = [];
    axios.get('/course').then((res)=>{
        res.data.forEach(itm => { console.log("COURSES: ", itm); courses.push(itm); });
    });

    return {
        type: LOAD_COURSES,
        courses,
    };
}