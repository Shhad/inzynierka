import {
    delay
} from 'redux-saga';

import {
    put,
    takeLatest
} from 'redux-saga/effects';

const getCategories = () => {
    const data = [
        {
            categoryid: 1,
            name: 'nabial',
            description: 'Rzeczy mleczne',

        },
        {
            categoryid: 2,
            name: 'pieczywo',
            description: 'Rzeczy mleczne',

        },
        {
            categoryid: 3,
            name: 'produkty miesne',
            description: 'Rzeczy mleczne',

        },
        {
            categoryid: 4,
            name: 'warzywa',
            description: 'Rzeczy mleczne',

        },
        {
            categoryid: 5,
            name: 'owoce',
            description: 'Rzeczy mleczne',

        }
    ];
    console.log(data);
    return data;
};

function* loadCategories () {
    try {
        yield delay(1000);
        const categoriesList = yield getCategories();
        yield put({ type: 'GET_CATEGORIES_SUCCESS', payload: categoriesList});
    } catch (e) {
        yield put({ type: 'GET_CATEGORIES_FAILURE', payload: e});
    }
}

function* watchGetCategories() {
    yield takeLatest('GET_CATEGORIES', loadCategories);
}

export default function* categorySaga() {
    yield [
        watchGetCategories()
    ]
}
