import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import ReduxPromise from 'redux-promise-middleware';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
//import { asyncCompose, ReduxAsyncConnect } from 'redux-async-connect';
import * as axios from 'axios';
import axiosMiddleware from 'redux-axios';
//import * as storage from 'redux-storage';
//import createEngine from 'redux-storage-engine-localstorage';

import { createLogger } from 'redux-logger';
import { saveState } from '../storage';

export const history = createHistory();

//const engine = createEngine('my-key');

//const storageMiddleware = storage.createMiddleware(engine/*, // any extra args should be action types to not update storage */)

const client = {
    default:{
        axios:{
            baseURL:'/',
            responseType: 'json',
        }
    }
};

const middlewares = applyMiddleware(
  //  storageMiddleware,
    ReduxPromise(),
    axiosMiddleware(client),
    routerMiddleware(history),
    //createLogger(),
    thunk
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState){
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancer(middlewares)
    );
    if(module.hot){
        module.hot.accept('../reducers', () => {
            //const nextRootReducer = require('../reducers').default;
            store.replaceReducer(rootReducer);
        });
    }
    //const loader = storage.createLoader(engine);
    //loader(store).then( res =>{
    //    console.log("PULLE FROM STORAGEL ", res);
    //});
    store.subscribe(() => {
        saveState(store.getState());
    });
    return store;
}
