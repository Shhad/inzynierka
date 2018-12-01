import { createReducer } from 'redux-act';
import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';


const initialState = Map({
    locationBeforeTransitions: null
});

const routerReducer = createReducer({
    [LOCATION_CHANGE]: (state, payload) => state.merge({
        locationBeforeTransitions: payload
    })
}, initialState);

export default routerReducer;
