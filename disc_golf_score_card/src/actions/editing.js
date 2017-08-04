export const SET_EDITING = 'SET_EDITING';
export const UNSET_EDITING = 'UNSET_EDITING';

export const setEditing = elementId  =>({
    type: SET_EDITING,
    payload:{
        elementId
    }
});

export const unsetEditing = elementId =>({
    type: UNSET_EDITING,
    payload:{
        elementId
    }
});