import { Record } from 'immutable';
import { combineReducers } from 'redux-immutable';

import router from './routerReducer';

const reducers = {
    router
};

export const createStateRecord = (_reducers) => {
    const initialState = Object.keys(_reducers).reduce((state, key) => {
        state[key] = undefined;
        return state;
    }, {});
    return Record(initialState);
};

export const StateRecord = createStateRecord(reducers);
const rootReducer = combineReducers(reducers, StateRecord);

export default rootReducer;
