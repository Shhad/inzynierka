import {
    delay
} from 'redux-saga';

import {
    put,
    takeLatest
} from 'redux-saga/effects';
import {SERWER_LOCAL} from "../constants/AppConstants";

const getUserFavourites = (userid) => {
    try {
        console.log('getting favourite user');
        const response = fetch(`${SERWER_LOCAL}/api/favourite/favourites/${userid}`,{
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
                favouriteid: 1,
                userid: 1,
                name: 'moja grupa ulubiona1'
            },
            {
                favouriteid: 1,
                userid: 1,
                name: 'moj ulubione jogurty'
            }
        ];
        return data;
    }
};

const getUserFavouritesProducts = (userid) => {
    try {
        console.log('getting favourite user');
        const response = fetch(`${SERWER_LOCAL}/api/favourite/${userid}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        console.log(response.body);

        const favouriteDetail = JSON.parse(response.body);
        const response2 = fetch(`${SERWER_LOCAL}/api/favourite/products/${userid}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(response2);
        console.log(response2.body);
        return JSON.parse(response.body);
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`);
        const data = [
            {
                favouriteid: 1,
                userid: 1,
                name: 'moja grupa ulubiona1',
                products: [
                    {
                        productid: 3,
                        categoryid: 1,
                        shopid: 1,
                        name: 'Chleb żytni',
                        description: 'Chleb żytni z nutką ziarenek żytnihc. O smaku żytnim.',
                        price: 4.35,
                        currency: 'PLN',
                        link: 'http://cdn.przepisy100.pl/v/pl/7/7e770033f9e5bf87371dd35037e80e3a.jpg',
                        url: 'http://cdn.przepisy100.pl/v/pl/7/7e770033f9e5bf87371dd35037e80e3a.jpg'
                    },
                    {
                        productid: 5,
                        categoryid: 1,
                        shopid: 1,
                        name: 'Chleb',
                        description: 'Chleb taki bardzo smaczny, lekko pszenny lekko nie pszenny.',
                        price: 2.37,
                        currency: 'PLN',
                        link: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg',
                        url: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg'
                    }
                ]
            },
            {
                favouriteid: 1,
                userid: 1,
                name: 'moj ulubione jogurty',
                products: [
                    {
                        productid: 10,
                        categoryid: 2,
                        shopid: 'Biedronka',
                        name: 'Jogurt malinowy Jogobella, 500ml',
                        description: 'Bardzo suchy chleb dla konia. Idealny dla konia',
                        price: 2.69,
                        currency: 'PLN',
                        link: 'http://konie.t8.pl/media/images/suchy_chleb.jpg',
                        url: 'http://promyczek-lowicz.pl/userdata/gfx/a55af9ed63e5eba977a8f64550754cc0.jpg'
                    },
                    {
                        productid: 7,
                        categoryid: 1,
                        shopid: 'Biedronka',
                        name: 'Jogurt truskawkowy Jogobella, 500ml',
                        description: 'Chleb żytni z nutką ziarenek żytnihc. O smaku żytnim.',
                        price: 2.69,
                        currency: 'PLN',
                        link: 'http://cdn.przepisy100.pl/v/pl/7/7e770033f9e5bf87371dd35037e80e3a.jpg',
                        url: 'https://img.e-piotripawel.pl/4014500021560.jpg'
                    }
                ]
            }
        ];
        return data;
    }
};

const addFavouriteProduct = (favouriteid, productid) => {
    try {
        console.log('adding favourite product');
        const response = fetch(`${SERWER_LOCAL}/api/favourite/add2`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                favouriteid: favouriteid,
                productid: productid
            }
        });
        console.log(response);
        console.log(response.body);

        return JSON.parse(response.body);
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`);
        return true;
    }
};

const addFavourite = (favouriteid, userid, name) => {
    try {
        console.log('getting filtered products');
        const response = fetch(`${SERWER_LOCAL}/api/favourite/add`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                favouriteId: favouriteid,
                userId: userid,
                name: name
            }
        });
        console.log(response);
        console.log(response.body);

        return JSON.parse(response.body);
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`);
        return true;
    }
};

const deleteProductFromFavourite = (favourite, product) => {
    try {
        console.log('getting filtered products');
        const response = fetch(`${SERWER_LOCAL}/api/favourite/delete/${favourite}/${product}`,{
            method: 'DELETE',
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
        return true;
    }
};

function* addFavouriteFunction (action) {
    try {
        yield addFavourite(action.favourite);
        yield put({ type: 'GET_FAVOURITES'});
    } catch (e) {
        yield put({ type: 'ADD_FAVOURITE_FAILURE', payload: e});
    }
}

function* addProductToFavouriteFunction (action) {
    try {
        yield addFavouriteProduct(action.favouriteid, action.productid);
        yield put({ type: 'GET_FAVOURITES'});
    } catch (e) {
        yield put({ type: 'ADD_TO_FAVOURITE_FAILURE', payload: e});
    }
}

function* deleteProductFromFavouriteFunction (action) {
    try {
        yield deleteProductFromFavourite(action.favouriteid, action.productid);
        yield put({ type: 'GET_FAVOURITES'});
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
