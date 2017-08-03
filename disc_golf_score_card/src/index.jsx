import React from 'react';
import ReactDOM from 'react-dom';
import DiscGolfScoreCardApp from './disc-golf-score-card-app';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import { AppContainer } from 'react-hot-loader';
import { loadState } from  './storage';

const store = configureStore(loadState('gameData', 'players', 'currentTurn', 'router'));

const render = (Component) =>{
    return ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
}

render(DiscGolfScoreCardApp);

if(module.hot){
    require('react-hot-loader/patch');
    module.hot.accept('./index.jsx', () =>{
        render(DiscGolfScoreCardApp);
    });
}
