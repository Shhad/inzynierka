import { createStore, applyMiddleware } from 'redux';
import customHistory from './history';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers/rootReducers';
import rootEpic from './epics/rootEpic';

// Create history
export const browserHistory = customHistory;
const reduxRouterMiddleware = routerMiddleware(browserHistory);

const epicMiddleware = createEpicMiddleware();

const middlewares = [
    thunkMiddleware,
    reduxRouterMiddleware,
    epicMiddleware
];

const configureStore = (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    );
    return store;
};

epicMiddleware.run(rootEpic);

export default configureStore;
