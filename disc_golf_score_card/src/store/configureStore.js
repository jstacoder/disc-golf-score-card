import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axiosRedux from 'axios-redux';
//import { asyncCompose, ReduxAsyncConnect } from 'redux-async-connect';
//import * as axios from 'axios';

export const history = createHistory();

const axiosMiddleware = axiosRedux({
    default: {
        axios: {
            baseURL: '/api/',
            responseType: 'json',
        },
        options: {
            interceptors:{
                request: [
                    (getState, config) =>{
                        console.log('in request interceptor', getState(), config);
                        return config;
                    }
                ],
                response:[
                    (getState, response) =>{
                        console.log('inside response interceptor', getState(), config);
                        return response;
                    }
                ]
            }
        }
    }
})

export function configureStore(initialState){
    const store = createStore(
        rootReducer,
        initialState,
        compose(
           applyMiddleware(
               ReduxPromise,
               //ReduxAsyncConnect,
               routerMiddleware(history),
               createLogger(),
               thunk,
            ),
           window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
    if(module.hot){
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
