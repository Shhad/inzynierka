import 'babel-polyfill';
import 'rxjs/Rx';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from 'react-router-redux';

import { selectLocationState } from './selectors/routerSelectors';
import Root from './Root';
import configureStore, { browserHistory } from './store';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState()
});

if (DEV) {
    render(
        <AppContainer>
            <Root store={store} history={history} />
        </AppContainer>,
        document.getElementById('app')
    );
    if (module.hot) {
        module.hot.accept('./Root', () => {
            // eslint-disable-next-line global-require
            const NextRoot = require('./Root').default;
            render(
                <AppContainer>
                    <NextRoot store={store} history={history} />
                </AppContainer>,
                document.getElementById('app')
            );
        });
    }
} else {
    render(
        <Root store={store} history={history} />,
        document.getElementById('app')
    );
}
