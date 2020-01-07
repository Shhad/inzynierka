import {
    delay
} from 'redux-saga';

import {
    put,
    takeLatest
} from 'redux-saga/effects';
import {SERWER_PROD} from "../constants/AppConstants";

const getUserOrders = (userid) => {
    try {
        console.log('getting order user');
        const response = fetch(`${SERWER_PROD}/api/order/orders/${userid}`,{
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

const getProductsOfOrder = async(orderId) => {
    const response = await fetch(`${SERWER_PROD}/api/product/products/order/${orderId}`,{
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

const getUserOrdersProducts = async(userid) => {
    try {
        console.log('getting order user');
        let responseData;
        const response = await fetch(`${SERWER_PROD}/api/order/orderss/${userid}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if(data.status === 'ok') {
                    console.log('orders properly taken');
                    console.log(data.data);
                    responseData = data.data;
                    console.log(responseData);
                    return data.data;
                } else {
                    console.log(`Something went wrong with fetching orders`);
                    return false;
                }
            })
            .catch(error => {
                console.log(`Error occurred: ${error}.`);
                return false;
            });
        await response;

        await Promise.all(responseData.map(async order => {
            order.products = await getProductsOfOrder(order.orderId);
        }));

        return response;
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_PROD}.`);
        return [];
    }
};

const addOrderProduct = (orderid, productid) => {
    try {
        console.log('adding order product');
        console.log(orderid);
        console.log(productid);
        const response = fetch(`${SERWER_PROD}/api/order/add2`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                orderId: orderid,
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

const addOrder = (orderid, userid, name) => {
    try {
        console.log('getting filtered products');
        const response = fetch(`${SERWER_PROD}/api/order/add`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: 0,
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

const deleteProductFromOrder = (order, product) => {
    try {
        console.log('getting filtered products');
        const response = fetch(`${SERWER_PROD}/api/order/delete/${order}/${product}`,{
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

function* addOrderFunction (action) {
    try {
        yield addOrder(action.orderId, action.userId, action.name);
        yield put({ type: 'GET_ORDERS'});
    } catch (e) {
        yield put({ type: 'ADD_ORDER_FAILURE', payload: e});
    }
}

function* addProductToOrderFunction (action) {
    try {
        yield addOrderProduct(action.orderId, action.productId);
        yield put({ type: 'GET_ORDERS'});
    } catch (e) {
        yield put({ type: 'ADD_TO_ORDER_FAILURE', payload: e});
    }
}

function* deleteProductFromOrderFunction (action) {
    try {
        yield deleteProductFromOrder(action.orderId, action.productId);
    } catch (e) {
        yield put({ type: 'DELETE_FROM_ORDER_FAILURE', payload: e});
    }
}

function* loadOrders (action) {
    try {
        yield delay(1000);
        const orderList = yield getUserOrdersProducts(action.userid);
        yield put({ type: 'GET_ORDERS_SUCCESS', payload: orderList});
    } catch (e) {
        yield put({type: 'GET_ORDERS_FAILURE', payload: e});
    }
}

function* watchGetOrders() {
    yield takeLatest('GET_ORDERS', loadOrders);
}

function* watchAddOrder() {
    yield takeLatest('ADD_ORDER', addOrderFunction);
}

function* watchAddOrderProduct() {
    yield takeLatest('ADD_ORDER_PRODUCT', addProductToOrderFunction);
}

function* watchDeleteOrderProduct() {
    yield takeLatest('DELETE_ORDER_PRODUCT', deleteProductFromOrderFunction);
}

export default function* orderSaga() {
    yield [
        watchGetOrders(),
        watchAddOrder(),
        watchAddOrderProduct(),
        watchDeleteOrderProduct()
    ]
}
