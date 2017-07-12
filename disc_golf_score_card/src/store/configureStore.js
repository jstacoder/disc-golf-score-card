import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

import { createLogger } from 'redux-logger';

export const history = createHistory();

export function configureStore(initialState){
    const store = createStore(
        rootReducer,
        initialState,
        compose(
           applyMiddleware(
               ReduxPromise,
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
