import * as axios from 'axios';
// import fetch from 'isomorphic-fetch';
// export function selectCourse(course){
//     return {
//         type: SELECT_COURSE,
//         course
//     };
// }

// export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
// export function requestPlayers(){
//     return {
//         type: REQUEST_PLAYERS,
//     };
// }   
// export const REQUEST_COURSES = 'REQUEST_COURSES';
// export function requestCourses(){
//     return {
//         type: REQUEST_COURSES,
//     };
// }
// export const START_GAME = 'START_GAME';
// export function startGame(course, players){
//     return {
//         type: START_GAME,
//         course,
//         players,
//     };
// }
// // OLD CODE 
// import * as axios from 'axios';
// // CURRENT GAME ACTIONS
// export const ADD_PLAYER_TO_GAME = 'ADD_PLAYERS_TO_GAME';
// //export const ADD_COURSE_TO_GAME = 'ADD_COURSE_TO_GAME';
// //export const START_NEW_GAME = 'START_NEW_GAME';
// export function addPlayerToGame(player){
//     return {
//         type: ADD_PLAYER_TO_GAME,
//         player 
//     };
// }

// export function startNewGame(course, players){
//     return {
//         type: START_NEW_GAME,
//         course,
//         players,
//     }
// }

// // PLAYER ACTIONS 
// export const LOAD_PLAYERS = 'LOAD_PLAYERS';
// export const TOGGLE_PLAYER_NAME_COLOR = 'TOGGLE_PLAYER_NAME_COLOR';

// export function togglePlayerNameColor(player){
//     return {
//         type: TOGGLE_PLAYER_NAME_COLOR,
//         player
//     };
// }

export const LOAD_PLAYER_NAME_COLORS = 'LOAD_PLAYER_NAME_COLORS';
export const TOGGLE_PLAYER_NAME_COLOR = 'TOGGLE_PLAYER_NAME_COLOR';
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const START_NEW_GAME = 'START_NEW_GAME';
export const SELECT_COURSE = 'SELECT_COURSE';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const SAVE_GAME = 'SAVE_GAME';
export const CHANGE_HOLE = 'CHANGE_HOLE';

export function changeHole(holes, hole_id = null){
    return {
        type: CHANGE_HOLE,
        payload: {
            holes,
            hole_id
        }
    };
}


export function changePlayer(players){
    return {
        type: CHANGE_PLAYER,
        payload: {
            players: players,
        }
    };
}

export function updateScore(player, score, hole_id){
    return {
        type: UPDATE_SCORE,
        payload: {
            player,
            score,
            hole_id,
        }
    };
}

export function togglePlayerNameColor(player){
    return {
        type: TOGGLE_PLAYER_NAME_COLOR,
        player
    };
}

export function startNewGame(course){
    return {
        type: START_NEW_GAME,
        payload: {
            course: course
        }
    };
}

export function selectCourse(course){
    return {
        type: SELECT_COURSE,
        course,
    };
}
export function selectPlayer(player){
    return {
        type: SELECT_PLAYER,
        player
    };
}

export function loadPlayerNameColors(players){
    const playerNameColors = {};
    players.payload.data.map((player)=>{
        playerNameColors[player.name] = 'text-danger';
    });
    return {
        type: LOAD_PLAYER_NAME_COLORS,
        playerNameColors,
    };
}

export function loadPlayers(){
    console.log('loading players')

    return {
        types: ['FETCH_PLAYERS', 'FETCH_PLAYERS_SUCCESS', 'FETCH_PLAYES_FAILURE'],
        payload:{
            request:{
                url: '/api/player'
            }
        }
    };
}
export function loadCourses(){
    console.log('loading courses');

    return {
        types: [
            'FETCH_COURSES', 
            'FETCH_COURSES_SUCCESS', 
            'FETCH_COURSES_FAILURE'
        ],
        payload: {
            request: {
                url: '/course/'
            }
        }
    };
}
// export function loadCourses(){
//     const courses = axios.get('/course');
//     return {
//         type: LOAD_COURSES,
//         courses,
//     };
// }

// export function selectPlayer(player){
//     console.log("selecting: ",player);
//     return {
//         type: SELECT_PLAYER,
//         player
//     };
// }

// // COURSE ACTIONS
// export const LOAD_COURSES = 'LOAD_COURSES';


// export function loadCourses(){
//     let courses = [];
//     axios.get('/course').then((res)=>{
//         res.data.forEach(itm => { console.log("COURSES: ", itm); courses.push(itm); });
//     });

//     return {
//         type: LOAD_COURSES,
//         courses,
//     };
// }
