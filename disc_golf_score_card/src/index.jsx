import React from 'react';
import ReactDOM from 'react-dom';
import DiscGolfScoreCardApp from './disc-golf-score-card-app';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';

const store = configureStore();

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
    module.hot.accept('./index.jsx', () =>{
        render(DiscGolfScoreCardApp);
    });
}