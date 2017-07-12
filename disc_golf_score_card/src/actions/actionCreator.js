export default function createAction(action_name, action_type, payload = {}){
    let rtnObj =  {
        type: action_type,
        payload,
    };
    rtnObj[action_name] = function(payload){
        return dispatch => {
            dispatch(privateInnerFunc(payload));
        }
        function privateInnerFunc(data){
            return {...rtnObj, payload: data};
        }
    }
    return rtnObj;
}

