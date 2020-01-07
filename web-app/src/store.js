import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable'
import customHistory from './history';
import  createSagaMiddleware from 'redux-saga';

//Reducers
import reducerProduct from './reducers/productReducer';
import reducerShop from './reducers/shopReducer';
import reducerOrder from './reducers/orderReducers';
import reducerCategory from './reducers/categoryReducer';
import reducerUser from './reducers/userReducer';

//Sagas
import orderSaga from './sagas/orderSaga';
import rootSaga from './sagas/productSaga';
import shopSaga from './sagas/shopSaga';
import categorySaga from './sagas/categorySaga';
import userSaga from './sagas/userSaga';

// Create history
export const browserHistory = customHistory;

const sagaMiddleware = createSagaMiddleware();
const orderMiddleware = createSagaMiddleware();
const shopMiddleware = createSagaMiddleware();
const categoryMiddleware = createSagaMiddleware();
const userMiddleware = createSagaMiddleware();

const configureStore = () => {
    const store = createStore(
        combineReducers({reducerProduct, reducerOrder, reducerShop, reducerCategory, reducerUser}),
        compose(
            applyMiddleware(sagaMiddleware),
            applyMiddleware(orderMiddleware),
            applyMiddleware(shopMiddleware),
            applyMiddleware(categoryMiddleware),
            applyMiddleware(userMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    sagaMiddleware.run(rootSaga);
    orderMiddleware.run(orderSaga);
    shopMiddleware.run(shopSaga);
    categoryMiddleware.run(categorySaga);
    userMiddleware.run(userSaga);
    return store;
};

export default configureStore;
