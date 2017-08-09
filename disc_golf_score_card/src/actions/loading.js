export const SET_LOADING = 'SET_LOADING';
export const UNSET_LOADING  = 'UNSET_LOADING';

export const setLoading = () =>({
    type: SET_LOADING,
});

export const unsetLoading = () =>({
    type: UNSET_LOADING,
});