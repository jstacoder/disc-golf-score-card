import * as axios from 'axios';

// CURRENT GAME ACTIONS
export const ADD_PLAYERS_TO_GAME = 'ADD_PLAYERS_TO_GAME';
export const ADD_COURSE_TO_GAME = 'ADD_COURSE_TO_GAME';
export const START_NEW_GAME = 'START_NEW_GAME';

export function addPlayersToGame(players = null, gameData){
    if(players){
        players.map(player =>{
            gameData.players.push(player);
        });
    }
    return {
        type: ADD_PLAYERS_TO_GAME,
        payload: gameData, 
    };
}

export function addCourseToGame(course = null, gameData){
    if(course){
        gameData.course = course;
    }
    return {
        type: ADD_COURSE_TO_GAME,
        payload: gameData,
    };
}

export function startNewGame(gameData){
    return {
        type: START_NEW_GAME,
        payload: gameData,
    }
}

// PLAYER ACTIONS 
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const LOAD_PLAYERS = 'LOAD_PLAYERS';
export const LOAD_PLAYER_NAME_COLORS = 'LOAD_PLAYER_NAME_COLORS';
export const TOGGLE_PLAYER_NAME_COLOR = 'TOGGLE_PLAYER_NAME_COLOR';

export function togglePlayerNameColor(player = null, playerNameColors = null){
    let setDanger = playerNameColors[player.name] === 'text-success';
    if(setDanger){
        playerNameColors[player.name] = 'text-danger';
    }else{
        playerNameColors[player.name] = 'text-success';
    }
    return {
        type: TOGGLE_PLAYER_NAME_COLOR,
        payload: playerNameColors,
    };
}

export function loadPlayerNameColors(players){
    const data = {};
    players.map((player)=>{
        data[player.name] = 'text-danger';
    });
    return {
        type: LOAD_PLAYER_NAME_COLORS,
        payload: data,
    };
}

export function loadPlayers(){
    const data = axios.get('/api/player');

    return {
        type: LOAD_PLAYERS,
        payload: data,
    };
}

export function selectPlayer(player = null){
    console.log(player);
    if(player){
        player.selected = !player.selected;
    }
    return {
        type: SELECT_PLAYER,
        payload: player
    };
}

// COURSE ACTIONS
export const SELECT_COURSE = 'SELECT_COURSE';
export const LOAD_COURSES = 'LOAD_COURSES';


export function loadCourses(){
    const data = axios.get('/course');

    return {
        type: LOAD_COURSES,
        payload: data,
    };
}

export function selectCourse(course = null){
    if(course){
        course.selected = !course.selected;
    }
    return {
        type: SELECT_COURSE,
        payload: course,
    }
}