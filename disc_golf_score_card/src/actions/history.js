export const SET_ACTIVE = 'SET_ACTIVE';
export const ADD_PANEL = 'ADD_PANEL';


export const setActive = (panel) =>({
    type: SET_ACTIVE,
    payload: {
        panel,
    }
});
export const addPanel = (panel) =>({
    type: ADD_PANEL,
    payload: {
        panel,
    }
});