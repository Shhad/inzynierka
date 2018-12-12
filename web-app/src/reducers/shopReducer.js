import {
    Map,
    List
} from 'immutable';

const INITIAL_STATE = Map({
    shopList: List([]),
    view: Map({
        isLoading: false,
        errorLoading: false,
        errorMessage: ''
    })
});

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_SHOPS':
            return state.merge({
                view: {
                    isLoading: true,
                    errorLoading: false
                }
            });
        case 'GET_SHOPS_SUCCESS':
            return state.merge({
                shopList: action.payload,
                view: {
                    isLoading: false,
                    errorLoading: false,
                    errorMessage: 'Wykonano idealnie.'
                }
            });
        case 'GET_SHOPS_FAILURE':
            return state.merge({
                view: {
                    isLoading: false,
                    errorLoading: true,
                    errorMessage: 'Wystąpił błąd podczas pobierania sklepów.'
                }
            });
        default: return state;
    }
}
