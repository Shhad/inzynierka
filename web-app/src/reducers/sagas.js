import {
    delay
} from 'redux-saga';

import {
    put,
    select,
    takeLatest
} from 'redux-saga/effects';

const getProductsPromotionFromServer = () => {
    const data = [
    {
        productid: 1,
            categoryid: 1,
        shopid: 1,
        name: 'chleb',
        description: 'taki sobie chleb xDDD',
        price: 21.37,
        currency: 'szekle',
        link: 'www.pornhub.com',
        url: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg'
    },
    {
        productid: 2,
            categoryid: 2,
        shopid: 2,
        name: 'mleko',
        description: 'takie sobie mleko',
        price: 21.37,
        currency: 'pomarancze',
        link: 'www.pornhub.com',
        url: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg'
    },
        {
            productid: 1,
            categoryid: 1,
            shopid: 1,
            name: 'chleb',
            description: 'taki sobie chleb xDDD',
            price: 21.37,
            currency: 'szekle',
            link: 'www.pornhub.com',
            url: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg'
        },
        {
            productid: 2,
            categoryid: 2,
            shopid: 2,
            name: 'mleko',
            description: 'takie sobie mleko',
            price: 21.37,
            currency: 'pomarancze',
            link: 'www.pornhub.com',
            url: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg'
        },
        {
            productid: 1,
            categoryid: 1,
            shopid: 1,
            name: 'chleb',
            description: 'taki sobie chleb xDDD',
            price: 21.37,
            currency: 'szekle',
            link: 'www.pornhub.com',
            url: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg'
        },
        {
            productid: 2,
            categoryid: 2,
            shopid: 2,
            name: 'mleko',
            description: 'takie sobie mleko',
            price: 21.37,
            currency: 'pomarancze',
            link: 'www.pornhub.com',
            url: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg'
        },
        {
            productid: 1,
            categoryid: 1,
            shopid: 1,
            name: 'chleb',
            description: 'taki sobie chleb xDDD',
            price: 21.37,
            currency: 'szekle',
            link: 'www.pornhub.com',
            url: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg'
        },
        {
            productid: 2,
            categoryid: 2,
            shopid: 2,
            name: 'mleko',
            description: 'takie sobie mleko',
            price: 21.37,
            currency: 'pomarancze',
            link: 'www.pornhub.com',
            url: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg'
        }
    ];
    console.log(data);
    return data;
};

function* loadProducts () {
    try {
        yield delay(1000);
        const productList = yield getProductsPromotionFromServer();
        yield put({ type: 'GET_PRODUCTS_SUCCESS', payload: productList});
    } catch (e) {
        yield put({type: 'GET_PRODUCTS_FAILURE', payload: e});
    }
}

function* watchGetProducts() {
    yield takeLatest('GET_PRODUCTS', loadProducts);
}

export default function* rootSaga() {
    yield [
        watchGetProducts()
    ]
}
