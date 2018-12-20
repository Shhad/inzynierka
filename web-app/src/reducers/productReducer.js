import {
    Map,
    List,
    fromJS
} from 'immutable';

const INITIAL_STATE = Map({
    productList: List([]),
    view: Map({
        isLoading: false,
        errorLoading: false,
        errorMessage: String
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
        case 'GET_PRODUCTS_ALL':
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
                    errorLoading: false,
                    errorMessage: 'Wykonano idealnie.'
                }
            });
        case 'GET_PRODUCTS_FAILURE':
            return state.merge({
                view: {
                    isLoading: false,
                    errorLoading: true,
                    errorMessage: 'Wystąpił błąd podczas pobierania produktów.'
                }
            });
        case 'ADD_PRODUCT_SUCCESS':
            return state.merge({
                view: {
                    errorLoading: false,
                    errorMessage: ''
                }
            });
        case 'ADD_PRODUCT_FAILURE':
            return state.merge({
                view: {
                    errorLoading: true,
                    errorMessage: 'Wystąpił błąd podczas dodawania produktu.'
                }
            });
        default: return state;
    }
}
