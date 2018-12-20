import {
    Map,
    List
} from 'immutable';

const INITIAL_STATE = Map({
    user: Map(),
    isLogged: false,
    view: Map({
        isLoading: false,
        errorLoading: false,
        errorMessage: String
    })
});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_USER_SUCCESS':
            return state.merge({
                isLogged: true,
                user: action.payload
            });
        case 'GET_USER_FAILURE':
            return state.merge({
                view: {
                    isLoading: false,
                    errorLoading: true,
                    errorMessage: 'Wystąpił błąd podczas logowania!'
                }
            });
        case 'GET_USER_WRONG':
            return state.merge({
                view: {
                    isLoading: false,
                    errorLoading: true,
                    errorMessage: 'Złe hasło lub login!'
                }
            });
        case 'ADD_USER_SUCCESS':
            return state.merge({
                view: {
                    errorLoading: false,
                    errorMessage: 'Pomyślnie dodano użytkownika!'
                }
            });
        case 'ADD_USER_FAILURE':
            return state.merge({
                view: {
                    errorLoading: true,
                    errorMessage: 'Wystąpił błąd podczas dodawania użytkownika!'
                }
            });
        default: return state;
    }
}
