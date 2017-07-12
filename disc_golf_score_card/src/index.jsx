import React from 'react';
import { render } from 'react-dom';
import DiscGolfScoreCardApp from './disc-golf-score-card';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <DiscGolfScoreCardApp />
    </Provider>,
    document.getElementById('app')
)