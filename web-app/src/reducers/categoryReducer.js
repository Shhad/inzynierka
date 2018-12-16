import { Map, List } from 'immutable';

const FAVOURITE_STATE = Map({
    categoryList: List([]),
    view: Map({
        isLoading: false,
        errorLoading: false,
        errorMessage: String
    })
});

export default function (state = FAVOURITE_STATE, action) {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return state.merge({
                view: {
                    isLoading: true,
                    errorLoading: false
                }
            });
        case 'GET_CATEGORIES_SUCCESS':
            return state.merge({
                categoryList: action.payload,
                view: {
                    isLoading: false,
                    errorLoading: false,
                    errorMessage: 'Wykonano prawidlowo.'
                }
            });
        case 'GET_CATEGORIES_FAILURE':
            return state.merge({
                view: {
                    isLoading: false,
                    errorLoading: true,
                    errorMessage: 'Wystapil błąd podczas pobierania kategorii.'
                }
            });
        default: return state;
    }
}
