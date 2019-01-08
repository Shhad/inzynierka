import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable'
import customHistory from './history';
import  createSagaMiddleware from 'redux-saga';

//Reducers
import reducerProduct from './reducers/productReducer';
import reducerShop from './reducers/shopReducer';
import reducerFavourite from './reducers/favouriteReducers';
import reducerCategory from './reducers/categoryReducer';
import reducerUser from './reducers/userReducer';

//Sagas
import favouriteSaga from './sagas/favouriteSaga';
import rootSaga from './sagas/productSaga';
import shopSaga from './sagas/shopSaga';
import categorySaga from './sagas/categorySaga';
import userSaga from './sagas/userSaga';

// Create history
export const browserHistory = customHistory;

const sagaMiddleware = createSagaMiddleware();
const favouriteMiddleware = createSagaMiddleware();
const shopMiddleware = createSagaMiddleware();
const categoryMiddleware = createSagaMiddleware();
const userMiddleware = createSagaMiddleware();

const configureStore = () => {
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
