export const loadState = (...keys) => {
    try{
        const serializedState = window.localStorage.getItem('state');
        const objState = JSON.parse(serializedState);
        if(!keys){
            keys = Object.keys(objState);
        }
        let rtn = {};
        keys.map(key =>{
            rtn = { [key] : objState[key], ...rtn};
        });
        return rtn;
    }catch(err){
        return undefined;
    }
    return undefined;
};

export const saveState = (state) =>{
    try{
        const serializedState = JSON.stringify(state);
        window.localStorage.setItem('state', serializedState);
    }catch(err){
        // ignore
    }
};

