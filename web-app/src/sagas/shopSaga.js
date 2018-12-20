import {
    put,
    select,
    takeLatest
} from 'redux-saga/effects';
import {SERWER_LOCAL} from "../constants/AppConstants";

const getAllShopsFromServer = () => {
        try {
            console.log('fetching with get shops');
            const response = fetch(`${SERWER_LOCAL}/api/shop/shops`,{
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
            console.log(`Could not fetch data from ${SERWER_LOCAL}.`);

            return [];
        }
};

function* loadAllShops () {
    try {
        const shopList = yield getAllShopsFromServer();
        yield put({ type: 'GET_SHOPS_SUCCESS', payload: shopList});
    } catch (e) {
        yield put({type: 'GET_SHOPS_FAILURE', payload: e});
    }
}

function* watchGetShops() {
    yield takeLatest('GET_SHOPS', loadAllShops);
}

export default function* shopSaga() {
    yield [
        watchGetShops()
    ]
}
