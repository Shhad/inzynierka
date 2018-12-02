import {
    Map,
    List
} from 'immutable';

const INITIAL_STATE = Map({
    productList: List([]),
    view: Map({
        isLoading: false,
        errorLoading: false
    })
});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return state.merge({
                view: {
                    isLoading: true,
                    errorLoading: false
                }
            });
        case 'GET_PRODUCTS_SUCCESS':
            return state.merge({
                productList: action.payload,
                view: {
                    isLoading: false,
                    errorLoading: false
                }
            });
        case 'GET_PRODUCTS_FAILURE':
            return state.merge({
                view: {
                    isLoading: false,
                    errorLoading: true
                }
            });
        default: return state;
    }
}
