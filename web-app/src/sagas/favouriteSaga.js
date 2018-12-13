import {
    delay
} from 'redux-saga';

import {
    put,
    takeLatest
} from 'redux-saga/effects';

const getUserFavourites = () => {
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
            name: 'moja grupa ulubiona2',
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
                },
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
                },
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
        }
    ];
    console.log(data);
    return data;
};

const addFavourite = (favourite) => {
    const response ={
        status: 'ok'
    };
    return response;
};

const addProductToFavourite = (favourite, product) => {
    const response ={
        status: 'ok'
    };
    return response;
};

const deleteProductFromFavourite = (favourite, product) => {
    const response ={
        status: 'ok'
    };
    return response;
};

function* addFavouriteFunction (newFav) {
    try {
        yield addFavourite(newFav);
        yield put({ type: 'ADD_FAVOURITE_SUCCESS'});
    } catch (e) {
        yield put({ type: 'ADD_FAVOURITE_FAILURE', payload: e});
    }
}

function* addProductToFavouriteFunction (favourite, product) {
    try {
        yield addProductToFavourite(favourite, product);
        yield put({ type: 'ADD _TO_FAVOURITE_SUCCESS'});
    } catch (e) {
        yield put({ type: 'ADD_TO_FAVOURITE_FAILURE', payload: e});
    }
}

function* deleteProductFromFavouriteFunction (favourite, product) {
    try {
        yield deleteProductFromFavourite(favourite, product);
        yield put({ type: 'DELETE_FROM_FAVOURITE_SUCCESS'});
    } catch (e) {
        yield put({ type: 'DELETE_FROM_FAVOURITE_FAILURE', payload: e});
    }
}

function* loadFavourites () {
    try {
        yield delay(1000);
        const favouriteList = yield getUserFavourites();
        yield put({ type: 'GET_FAVOURITES_SUCCESS', payload: favouriteList});
    } catch (e) {
        yield put({type: 'GET_FAVOURITES_FAILURE', payload: e});
    }
}

function* watchGetFavourites() {
    yield takeLatest('GET_FAVOURITES', loadFavourites);
}

export default function* favouriteSaga() {
    yield [
        watchGetFavourites()
    ]
}
