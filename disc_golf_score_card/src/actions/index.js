import * as axios from 'axios';

export const LOAD_PLAYER_NAME_COLORS = 'LOAD_PLAYER_NAME_COLORS';
export const TOGGLE_PLAYER_NAME_COLOR = 'TOGGLE_PLAYER_NAME_COLOR';
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const START_NEW_GAME = 'START_NEW_GAME';
export const START_NEW_GAME_PENDING = 'START_NEW_GAME_PENDING';
export const START_NEW_GAME_FULFILLED = 'START_NEW_GAME_FULFILLED';
export const SELECT_COURSE = 'SELECT_COURSE';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const SAVE_GAME = 'SAVE_GAME';
export const CHANGE_HOLE = 'CHANGE_HOLE';
export const SET_REDIRECT = 'SET_REDIRECT';
export const UNSET_REDIRECT = 'UNSET_REDIRECT';
export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';
export const RESET_COUNT = 'RESET_COUNT';
export const SET_GAME_START = 'SET_GAME_START';
export const UNSET_GAME_START = 'SET_GAME_START';
export const UPDATE_WINNER = 'UPDATE_WINNER';
export const CALCULATE_SCORE = 'CALCULATE_SCORE';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const RESET_GAME_DATA = 'RESET_CURRENT_GAME_DATA';
export const SET_COUNT = 'SET_COUNT';
export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_PLAYER_PENDING = 'ADD_PLAYER_PENDING';
export const ADD_PLAYER_FULFILLED = 'ADD_PLAYER_FULFILLED';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const REMOVE_PLAYER_REQUEST = 'REMOVE_PLAYER_REQUEST';
export const REMOVE_PLAYER_REQUEST_PENDING = 'REMOVE_PLAYER_REQUEST_PENDING';
export const REMOVE_PLAYER_REQUEST_FULFILLED = 'REMOVE_PLAYER_REQUEST_FULFILLED';
export const ADD_COURSE = 'ADD_COURSE';
export const ADD_COURSE_REQUEST = 'ADD_COURSE_REQUEST';
export const ADD_COURSE_REQUEST_PENDING = 'ADD_COURSE_REQUEST_PENDING';
export const ADD_COURSE_REQUEST_FULFILLED = 'ADD_COURSE_REQUEST_FULFILLED';
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const REMOVE_COURSE_REQUEST_ERROR = 'REMOVE_COURSE_REQUEST_ERROR';
export const REMOVE_COURSE_REQUEST_PENDING = 'REMOVE_COURSE_REQUEST_PENDING';
export const REMOVE_COURSE_REQUEST_FULFILLED = 'REMOVE_COURSE_REQUEST_FULFILLED';
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const LOAD_ALL_GAMES_HISTORY = 'LOAD_ALL_GAMES_HISTORY';
export const LOAD_ALL_GAMES_HISTORY_SUCCESS = 'LOAD_ALL_GAMES_HISTORY_SUCCESS';
export const LOAD_ALL_GAMES_HISTORY_FAILURE = 'LOAD_ALL_GAMES_HISTORY_FAILURE';
export const LOAD_GAME_HISTORY = 'LOAD_ALL_GAMES_HISTORY';
export const LOAD_GAME_HISTORY_SUCCESS = 'LOAD_ALL_GAMES_HISTORY_SUCCESS';
export const LOAD_GAME_HISTORY_FAILURE = 'LOAD_ALL_GAMES_HISTORY_FAILURE';

export const loadGameHistory = (gameId) =>({
    types:[
        LOAD_GAME_HISTORY,
        LOAD_GAME_HISTORY_SUCCESS,
        LOAD_GAME_HISTORY_FAILURE,
    ],
    payload:{
        request:{
            url:`/api/game/${gameId}/`
        }
    }
});

export const loadAllGamesHistory = () =>({
    types:[
        LOAD_ALL_GAMES_HISTORY,
        LOAD_ALL_GAMES_HISTORY_SUCCESS,
        LOAD_ALL_GAMES_HISTORY_FAILURE
    ],    
    payload:{
        request:{
            url:'/api/gamelist/1',
        }
    }
});

export const setGameOver = () =>({
    type: SET_GAME_OVER,
    payload:{}
});

export const removeCourse = (course) =>({
    type: REMOVE_COURSE,
    payload: {
        course,
    }
});

export const removeCourseRequest = (course) =>({
    types:[
        REMOVE_COURSE_REQUEST_PENDING,
        REMOVE_COURSE_REQUEST_FULFILLED,
        REMOVE_COURSE_REQUEST_ERROR
    ],
    payload:{
        request:{
            url:`/api/course/${course.id}/`,
            method:'DELETE'            
        }
    }
});

export const addCourse = (course) =>({
    type: ADD_COURSE,
    payload:{
        course,
    }
});

export const addCourseRequest = (course) =>({
    types :[
        ADD_COURSE_REQUEST,
        ADD_COURSE_REQUEST_FULFILLED,
        ADD_COURSE_REQUEST_PENDING,
    ],
    payload:{
        request:{
            url:'/api/course/',
            method:'POST',
            data: course,
        }
    }
});

export const removePlayerRequest = (player) =>({
    types:[
        REMOVE_PLAYER_REQUEST,
        REMOVE_PLAYER_REQUEST_FULFILLED,
        REMOVE_PLAYER_REQUEST_PENDING,
    ],
    payload: {
        request: {
            url: `/api/player/${player.id}`,
            method: 'DELETE',
        }
    }
});

export const removePlayer = (player) =>({
    type: REMOVE_PLAYER,
    payload:{
        player,
    }
});

export const addPlayer = (player) =>({
    types: [
        ADD_PLAYER,         
        ADD_PLAYER_FULFILLED,
        ADD_PLAYER_PENDING, 
    ],
    payload:{
        request:{
            url: '/api/player/',
            data: player,
            method: 'POST',
        }
    }
});

export const setCount = (number) =>({
    type: SET_COUNT,
    payload:{
        number,
    }
});


export function resetGameData(){
    return {
        type: RESET_GAME_DATA,
    };
}
export function updateTotal(player, score){
    return {
        type: UPDATE_TOTAL,
        payload: {
            score,
            player
        }
    };
}

export function updateWinner(player){
    return {
        type: UPDATE_WINNER,
        payload:{
            player
        }
    };
}

export function calculateScore(player, course, holes){
    return {
        type: CALCULATE_SCORE,
        payload:{
            player,
            course,
            holes
        }
    };
}


export const setGameStart = (course) =>({
    type: SET_GAME_START,
    payload: {
        course,
    }
});

export const unsetGameStart = () =>({
    type: UNSET_GAME_START,
});

export const resetCount = () =>({
    type: RESET_COUNT,
});

export function incrementCount(){
    return {
        type: INCREMENT_COUNT,
    };
}

export function decrementCount(){
    return {
        type: DECREMENT_COUNT,
    };
}

export function setRedirect(){
    return {
        type: SET_REDIRECT,
    };
}

export function unsetRedirect(){
    return {
        type: UNSET_REDIRECT,
    };
}

export function changeHole(holes, direction = 'next', hole_id = null){
    return {
        type: CHANGE_HOLE,
        payload: {
            holes,
            direction,
            hole_id
        }
    };
}


export const changePlayer = (players, goToNext, goToLast) =>({    
    type: CHANGE_PLAYER,
    payload: {
        players,            
        goToNext,
        goToLast,
    }
})

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

export function startNewGame(course, players){
    return {
        type: START_NEW_GAME,
        payload: {
            course: course,
            promise: Promise.resolve(axios.post('/api/game/add', {course:course.id,  players: players.map(itm => (itm.id))}))
        }
    };
}

export const ADD_HOLE_SCORE = 'ADD_HOLE_SCORE';
export const ADD_HOLE_SCORE_PENDING = 'ADD_HOLE_SCORE_PENDING';
export const ADD_HOLE_SCORE_FULFILLED = 'ADD_HOLE_SCORE_FULFILLED';

export function addNewHoleScore(score_card_id,hole_id,player,score){
    return {
        type: ADD_HOLE_SCORE,
        payload: {
            promise: Promise.resolve(
                axios.post(
                    `/api/add_score/${score_card_id}/${hole_id}/${player.id}`,
                    { 
                        value: score 
                    }
                )
            )
        }
    }
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
                url: '/api/course/'
            }
        }
    };
}

