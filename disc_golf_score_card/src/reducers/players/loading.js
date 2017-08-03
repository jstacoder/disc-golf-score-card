import { FETCH_PLAYERS_PENDING, FETCH_COURSES_PENDING, FETCH_COURSES_SUCCESS, FETCH_PLAYERS_SUCCESS } from '../../actions';

const initialState = false

const loading = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_COURSES_PENDING:
            return true;
        case FETCH_PLAYERS_PENDING:
            return true;
        case FETCH_COURSES_SUCCESS:
            return false;
        case FETCH_PLAYERS_SUCCESS:
            return true;
        default:
            return state;
    }
};
/*
export default loading


        case FETCH_PLAYERS:
            return {
                ...state,
                loading: true,
            };            

            
        case FETCH_PLAYERS_SUCCESS:
            let addedPlayers = [];            
            let newScores = {};
            action.payload.data.map(itm =>{
                let addPlayer = true;
                for(let i = 0; i < state.players.length; i++){
                    const curr = state.players[i];
                    if(curr.id == itm.id){
                        addPlayer = false;
                    }
                }
                if(addPlayer){                    
                    addedPlayers.push(itm);
                    newScores[itm.name] = {};
                }                
            });
            return {
                ...state,
                players: [
                    ...state.players,
                    ...addedPlayers
                ],
                scores: {
                    ...state.scores,
                    ...newScores,
                },
                loading: false                
            };            */