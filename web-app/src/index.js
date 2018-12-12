import 'babel-polyfill';
import 'rxjs/Rx';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
import configureStore, { browserHistory } from './store';

const store = configureStore();

render(
        <AppContainer>
            <Root store={store} history={browserHistory} />
        </AppContainer>,
    document.getElementById('root')
);
