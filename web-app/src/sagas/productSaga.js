import {
    delay
} from 'redux-saga';

import {
    put,
    select,
    takeLatest
} from 'redux-saga/effects';
import { SERWER_LOCAL, SERWER_PROD} from "../constants/AppConstants";

const getProductsPromotionFromServer = () => {
    try {
        console.log('getting promotion products');
        const response = fetch(`${SERWER_LOCAL}/api/product/promotions`,{
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

const getProductsFromServer = () => {
    try {
        console.log('getting promotion products');
        const response = fetch(`${SERWER_LOCAL}/api/product/all`,{
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

const getProductsFilterFromServer = (categories, shops, name) => {
    try {
        console.log('getting filtered products');
        const response = fetch(`${SERWER_LOCAL}/api/product/products/filter`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categories: categories,
                shops: shops,
                name: name
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
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`);

        return [];
    }
};

const modifyProduct = (product) => {
    try {
        console.log('fetching with modify product');
        const response = fetch(`${SERWER_LOCAL}/api/product/modify`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: product.productId,
                categoryId: product.categoryId,
                shopId: product.shopId,
                name: product.name,
                description: product.description,
                price: product.price,
                currency: product.currency,
                link: product.link
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
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`);
    }
};

const addProduct = (product) => {
    try {
        console.log('fetching with add product');
        const response = fetch(`${SERWER_LOCAL}/api/product/add`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: product.productId,
                categoryId: product.categoryId,
                shopId: product.shopId,
                name: product.name,
                description: product.description,
                price: product.price,
                currency: product.currency,
                link: product.link
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
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`)
    }
};

function* addProductFunction (action) {
    try {
        yield addProduct(action.product);
        yield put({ type: 'GET_PRODUCTS_ALL'});
    } catch (e) {
        yield put({ type: 'ADD_PRODUCT_FAILURE', payload: e});
    }
}

function* modifyProductFunction (action) {
    try {
        yield modifyProduct(action.product);
        yield put({ type: 'GET_PRODUCTS_ALL'});
    } catch (e) {
        yield put({ type: 'MODIFY_PRODUCT_FAILURE', payload: e});
    }
}

function* loadProducts () {
    try {
        yield delay(1000);
        const productList = yield getProductsPromotionFromServer();
        console.log(productList);
        yield put({ type: 'GET_PRODUCTS_SUCCESS', payload: productList});
    } catch (e) {
        yield put({ type: 'GET_PRODUCTS_FAILURE', payload: e});
    }
}

function* loadProductsAll () {
    try {
        yield delay(1000);
        const productList = yield getProductsFromServer();
        console.log(productList);
        yield put({ type: 'GET_PRODUCTS_SUCCESS', payload: productList});
    } catch (e) {
        yield put({ type: 'GET_PRODUCTS_FAILURE', payload: e});
    }
}

function* loadFilteredProducts(action) {
    try {
        yield delay(1000);
        const productList = yield getProductsFilterFromServer(action.categories, action.shops, action.name);
        yield put({ type: 'GET_PRODUCTS_SUCCESS', payload: productList});
    } catch (e) {
        yield put({ type: 'GET_PRODUCTS_FAILURE', payload: e});
    }
}

function* watchGetProducts() {
    yield takeLatest('GET_PRODUCTS', loadProducts);
}

function* watchGetProductsAll() {
    yield takeLatest('GET_PRODUCTS_ALL', loadProductsAll);
}

function* watchGetFilteredProducts() {
    yield takeLatest('GET_FILTERED_PRODUCTS', loadFilteredProducts);
}

function* watchModifyProduct() {
    yield takeLatest('MODIFY_PRODUCT', modifyProductFunction);
}

function* watchAddProduct() {
    yield takeLatest('ADD_PRODUCT', addProductFunction);
}
export default function* rootSaga() {
    yield [
        watchGetProductsAll(),
        watchGetProducts(),
        watchGetFilteredProducts(),
        watchModifyProduct(),
        watchAddProduct()
    ]
}
