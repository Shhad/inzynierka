import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import {SERWER_LOCAL} from "../constants/AppConstants";

const getCategories = () => {
    try {
        console.log('fetching with get categories');
        const response = fetch(`${SERWER_LOCAL}/api/category/categories`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        console.log(response.body);
        return JSON.parse(response.body);
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`);
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
    }
};

function* loadCategories () {
    try {
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
/*
fetch('35.228.103.221:8080/api/category/categories',{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => {
            return response.json();
        });
 */
