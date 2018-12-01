import 'babel-polyfill';
import 'rxjs/Rx';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
import configureStore, { browserHistory } from './store';
import history from './history';

const store = configureStore();

render(
    <Root store={store} history={browserHistory} />,
    document.getElementById('root')
)
