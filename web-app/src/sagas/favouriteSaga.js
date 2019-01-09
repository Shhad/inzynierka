import {
    delay
} from 'redux-saga';

import {
    put,
    takeLatest
} from 'redux-saga/effects';
import {SERWER_PROD} from "../constants/AppConstants";

const getUserFavourites = (userid) => {
    try {
        console.log('getting favourite user');
        const response = fetch(`${SERWER_PROD}/api/favourite/favourites/${userid}`,{
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

const getProductsOfFavourite = async(favouriteId) => {
    const response = await fetch(`${SERWER_PROD}/api/product/products/favourite/${favouriteId}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            return data.data;
        })
        .catch(error => {
            console.log(`Error occurred: ${error}.`);
            return false;
        });
    return response;
};

const getUserFavouritesProducts = async(userid) => {
    try {
        console.log('getting favourite user');
        let responseData;
        const response = await fetch(`${SERWER_PROD}/api/favourite/favourites/${userid}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if(data.status === 'ok') {
                    console.log('favourites properly taken');
                    console.log(data.data);
                    responseData = data.data;
                    console.log(responseData);
                    return data.data;
                } else {
                    console.log(`Something went wrong with fetching favourites`);
                    return false;
                }
            })
            .catch(error => {
                console.log(`Error occurred: ${error}.`);
                return false;
            });
        await response;

        await Promise.all(responseData.map(async favourite => {
            favourite.products = await getProductsOfFavourite(favourite.favouriteId);
        }));

        return response;
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_PROD}.`);
        return [];
    }
};

const addFavouriteProduct = (favouriteid, productid) => {
    try {
        console.log('adding favourite product');
        console.log(favouriteid);
        console.log(productid);
        const response = fetch(`${SERWER_PROD}/api/favourite/add2`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                favouriteId: favouriteid,
                productId: productid
            })
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
        return false;
    }
};

const addFavourite = (favouriteid, userid, name) => {
    try {
        console.log('getting filtered products');
        const response = fetch(`${SERWER_PROD}/api/favourite/add`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                favouriteId: 0,
                userId: userid,
                name: name
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data);
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
        return false;
    }
};

const deleteProductFromFavourite = (favourite, product) => {
    try {
        console.log('getting filtered products');
        const response = fetch(`${SERWER_PROD}/api/favourite/delete/${favourite}/${product}`,{
            method: 'DELETE',
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
        return false;
    }
};

function* addFavouriteFunction (action) {
    try {
        yield addFavourite(action.favouriteId, action.userId, action.name);
        yield put({ type: 'GET_FAVOURITES'});
    } catch (e) {
        yield put({ type: 'ADD_FAVOURITE_FAILURE', payload: e});
    }
}

function* addProductToFavouriteFunction (action) {
    try {
        yield addFavouriteProduct(action.favouriteId, action.productId);
        yield put({ type: 'GET_FAVOURITES'});
    } catch (e) {
        yield put({ type: 'ADD_TO_FAVOURITE_FAILURE', payload: e});
    }
}

function* deleteProductFromFavouriteFunction (action) {
    try {
        yield deleteProductFromFavourite(action.favouriteId, action.productId);
    } catch (e) {
        yield put({ type: 'DELETE_FROM_FAVOURITE_FAILURE', payload: e});
    }
}

function* loadFavourites (action) {
    try {
        yield delay(1000);
        const favouriteList = yield getUserFavouritesProducts(action.userid);
        yield put({ type: 'GET_FAVOURITES_SUCCESS', payload: favouriteList});
    } catch (e) {
        yield put({type: 'GET_FAVOURITES_FAILURE', payload: e});
    }
}

function* watchGetFavourites() {
    yield takeLatest('GET_FAVOURITES', loadFavourites);
}

function* watchAddFavourite() {
    yield takeLatest('ADD_FAVOURITE', addFavouriteFunction);
}

function* watchAddFavouriteProduct() {
    yield takeLatest('ADD_FAVOURITE_PRODUCT', addProductToFavouriteFunction);
}

function* watchDeleteFavouriteProduct() {
    yield takeLatest('DELETE_FAVOURITE_PRODUCT', deleteProductFromFavouriteFunction);
}

export default function* favouriteSaga() {
    yield [
        watchGetFavourites(),
        watchAddFavourite(),
        watchAddFavouriteProduct(),
        watchDeleteFavouriteProduct()
    ]
}
