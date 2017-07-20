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


export const setGameStart = () =>({
    type: SET_GAME_START,
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
