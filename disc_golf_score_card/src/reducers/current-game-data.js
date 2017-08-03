/* jshint esversion: 6 */
/* jshint moz: true */
import { 
    SELECT_PLAYER, SELECT_COURSE, START_NEW_GAME, 
    START_NEW_GAME_PENDING, START_NEW_GAME_FULFILLED,
    SET_GAME_START, UPDATE_WINNER, CALCULATE_SCORE, RESET_GAME_DATA,
    SET_GAME_OVER
} from '../actions';

const initialState = {
        players: [],
        course: null,
        holesById:{},
        game_id: null,
        game_started: false,
        game_over: false,
        score_card_id: null,
        currentWinnerIndex:null,
        currentCoursePar:null,
        currentWinningScore:null
};

export default function gameData(state = initialState, action){    
    switch(action.type){
        case SET_GAME_OVER:
            return {...state, 
                game_over: true,
            };
        case RESET_GAME_DATA:
            return {...initialState};            
        case UPDATE_WINNER:
            return {...state, 
                currentWinnerIndex: state.players.indexOf(action.payload.player)
            };            
        case SET_GAME_START:
            return {...state, 
                game_started: true,
            };                            
        case START_NEW_GAME_FULFILLED:
            return {...state, 
                score_card_id: action.payload.data.score_card,
                game_id: action.payload.data.game,
            };                    
        case SELECT_PLAYER:
            let playerIdx = state.players.indexOf(action.player);            
            return {...state,
                players: playerIdx == -1 ?
                    [...state.players, action.player] :
                    state.players.filter(player =>(player.id!=action.player.id))                        
            };            
        case SELECT_COURSE:
            const getHolesById = holes =>{
                let rtn = {};
                holes.map((hole, idx) =>{
                    rtn[hole.id] = idx;
                });
                return rtn;
            }
            return {...state,
                course: action.course,
                holesById:getHolesById(action.course.holes),
            }; 
        default:
            return state;
    }    
}