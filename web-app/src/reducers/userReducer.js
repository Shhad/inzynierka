import {
    Map,
    List
} from 'immutable';

const INITIAL_STATE = Map({
    user: Map(),
    view: Map({
        isLoading: false,
        errorLoading: false,
        errorMessage: String
    })
});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_USER_DATA':
            return state.merge({
                view: {
                    isLoading: true,
                    errorLoading: false
                }
            });
        case 'GET_USER_DATA_SUCCESS':
            return state.merge({
                user: action.payload,
                view: {
                    isLoading: false,
                    errorLoading: false,
                    errorMessage: 'Wykonano idealnie.'
                }
            });
        case 'GET_USER_DATA_FAILURE':
            return state.merge({
                view: {
                    isLoading: false,
                    errorLoading: true,
                    errorMessage: 'Wystąpił błąd podczas pobierania użytkownika.'
                }
            });
        case 'ADD_USER_SUCCESS':
            return state.merge({
                view: {
                    errorLoading: false,
                    errorMessage: ''
                }
            });
        case 'ADD_USER_FAILURE':
            return state.merge({
                view: {
                    errorLoading: true,
                    errorMessage: 'Wystąpił błąd podczas dodawania użytkownika.'
                }
            });
        default: return state;
    }
}
