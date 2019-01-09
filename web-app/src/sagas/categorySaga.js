import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import {SERWER_PROD} from "../constants/AppConstants";

const getCategories = () => {
    try {
        console.log('fetching with get categories');
        const response = fetch(`${SERWER_PROD}/api/category/categories`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if(data.status === 'ok') {
                    console.log(data.data);
                    return data.data;
                } else {
                    console.log('not good');
                    return false;
                }
            })
            .catch(error => console.log(`Error occurred: ${error}.`));
        return response;
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_PROD}.`);
        return [];
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
