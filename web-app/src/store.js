import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable'
import customHistory from './history';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import  createSagaMiddleware from 'redux-saga';

//Reducers
import reducerProduct from './reducers/productReducer';
import reducerShop from './reducers/shopReducer';
import reducerFavourite from './reducers/favouriteReducers';
import reducerCategory from './reducers/categoryReducer';
import reducerUser from './reducers/userReducer';

//Sagas
import favouriteSaga from './sagas/favouriteSagas';
import rootSaga from './sagas/sagas';
import shopSaga from './sagas/shopSagas';
import categorySaga from './sagas/categorySagas';
import userSaga from './sagas/userSagas';

import reducer from './reducers/index';

// Create history
export const browserHistory = customHistory;
const reduxRouterMiddleware = routerMiddleware(browserHistory);

const epicMiddleware = createEpicMiddleware();

const middlewares = [
    thunkMiddleware,
    reduxRouterMiddleware,
    epicMiddleware
];

const sagaMiddleware = createSagaMiddleware();
const favouriteMiddleware = createSagaMiddleware();
const shopMiddleware = createSagaMiddleware();
const categoryMiddleware = createSagaMiddleware();
const userMiddleware = createSagaMiddleware();

const configureStore = (initialState) => {
    const store = createStore(
        combineReducers({reducerProduct, reducerFavourite, reducerShop, reducerCategory, reducerUser}),
        compose(
            applyMiddleware(sagaMiddleware),
            applyMiddleware(favouriteMiddleware),
            applyMiddleware(shopMiddleware),
            applyMiddleware(categoryMiddleware),
            applyMiddleware(userMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    sagaMiddleware.run(rootSaga);
    favouriteMiddleware.run(favouriteSaga);
    shopMiddleware.run(shopSaga);
    categoryMiddleware.run(categorySaga);
    userMiddleware.run(userSaga);
    return store;
};

export default configureStore;
