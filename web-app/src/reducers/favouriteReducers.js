import {
    Map,
    List,
    fromJS
} from 'immutable';

const FAVOURITE_STATE = Map({
    favouriteList: List([
    ]),
    view: Map({
        isLoading: false,
        errorLoading: false,
        errorMessage: String
    })
});

export default function (state = FAVOURITE_STATE, action) {
    switch (action.type) {
        case 'GET_FAVOURITES':
            return state.merge({
                view: {
                    isLoading: true,
                    errorLoading: false
                }
            });
        case 'GET_FAVOURITES_SUCCESS':
            return state.merge({
                favouriteList: action.payload,
                view: {
                    isLoading: false,
                    errorLoading: false,
                    errorMessage: 'Wykonano idealnie.'
                }
            });
        case 'GET_FAVOURITES_FAILURE':
            return state.merge({
                view: {
                    isLoading: false,
                    errorLoading: true,
                    errorMessage: 'Wystąpił błąd podczas pobierania ulubionych.'
                }
            });
        case 'ADD_FAVOURITE_SUCCESS':
            return state.merge({
                view: {
                    errorLoading: false,
                    errorMessage: ''
                }
            });
        case 'ADD_FAVOURITE_FAILURE':
            return state.merge({
                view: {
                    errorLoading: true,
                    errorMessage: 'Wystąpił błąd podczas dodawania nowych ulubionych.'
                }
            });
        default: return state;
    }
}
