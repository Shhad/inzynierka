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
            name: 'Chleb',
            description: 'Chleb taki bardzo smaczny, lekko pszenny lekko nie pszenny.',
            price: 1.37,
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
            price: 1.95,
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
            productid: 9,
            categoryid: 1,
            shopid: 1,
            name: 'Chleb żytni na zakwasie',
            description: 'Chleb taki bardzo smaczny, jak sama nazwa mówi za zakwasie robiony.',
            price: 2.59,
            currency: 'PLN',
            link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4f5GNx1Zl4jSyKbltAof0otq3_qn4ZMeBp9TfL86AvOjhGksncA',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4f5GNx1Zl4jSyKbltAof0otq3_qn4ZMeBp9TfL86AvOjhGksncA'
        },
        {
            productid: 10,
            categoryid: 2,
            shopid: 2,
            name: 'Chleb suchy dla konia',
            description: 'Bardzo suchy chleb dla konia. Idealny dla konia',
            price: 3.39,
            currency: 'PLN',
            link: 'http://konie.t8.pl/media/images/suchy_chleb.jpg',
            url: 'http://konie.t8.pl/media/images/suchy_chleb.jpg'
        },
        {
            productid: 7,
            categoryid: 1,
            shopid: 1,
            name: 'Chleb żytni',
            description: 'Chleb żytni z nutką ziarenek żytnihc. O smaku żytnim.',
            price: 4.35,
            currency: 'PLN',
            link: 'http://cdn.przepisy100.pl/v/pl/7/7e770033f9e5bf87371dd35037e80e3a.jpg',
            url: 'http://cdn.przepisy100.pl/v/pl/7/7e770033f9e5bf87371dd35037e80e3a.jpg'
        }
    ];
    console.log(data);
    return data;
};

const getProductsFilterFromServer = () => {
    const data = [
        {
            productid: 3,
            categoryid: 1,
            shopid: 1,
            name: 'Chleb żytni',
            description: 'Chleb żytni z nutką ziarenek żytnihc. O smaku żytnim.',
            price: 1.95,
            currency: 'PLN',
            link: 'http://cdn.przepisy100.pl/v/pl/7/7e770033f9e5bf87371dd35037e80e3a.jpg',
            url: 'http://cdn.przepisy100.pl/v/pl/7/7e770033f9e5bf87371dd35037e80e3a.jpg'
        },
        {
            productid: 9,
            categoryid: 1,
            shopid: 1,
            name: 'Chleb żytni na zakwasie',
            description: 'Chleb taki bardzo smaczny, jak sama nazwa mówi za zakwasie robiony.',
            price: 2.59,
            currency: 'PLN',
            link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4f5GNx1Zl4jSyKbltAof0otq3_qn4ZMeBp9TfL86AvOjhGksncA',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4f5GNx1Zl4jSyKbltAof0otq3_qn4ZMeBp9TfL86AvOjhGksncA'
        },
        {
            productid: 7,
            categoryid: 1,
            shopid: 1,
            name: 'Chleb żytni',
            description: 'Chleb żytni z nutką ziarenek żytnihc. O smaku żytnim.',
            price: 4.35,
            currency: 'PLN',
            link: 'http://cdn.przepisy100.pl/v/pl/7/7e770033f9e5bf87371dd35037e80e3a.jpg',
            url: 'http://cdn.przepisy100.pl/v/pl/7/7e770033f9e5bf87371dd35037e80e3a.jpg'
        }
    ];
    return data;
};

const modifyProduct = (product) => {
    const response = {
        status: "ok"
    };
    return response;
};

function* addProduct (newProduct) {
    try {
        yield addProduct(newProduct);
        yield put({ type: 'ADD_PRODUCT_SUCCESS'});
    } catch (e) {
        yield put({ type: 'ADD_PRODUCT_FAILURE', payload: e});
    }
}

function* modifyProductFunction (product) {
    try {
        yield modifyProduct(product);
        yield put({ type: 'MODIFY_PRODUCT_SUCCESS'});
    } catch (e) {
        yield put({ type: 'MODIFY_PRODUCT_FAILURE', payload: e});
    }
}

function* loadProducts () {
    try {
        yield delay(1000);
        const productList = yield getProductsPromotionFromServer();
        yield put({ type: 'GET_PRODUCTS_SUCCESS', payload: productList});
    } catch (e) {
        yield put({ type: 'GET_PRODUCTS_FAILURE', payload: e});
    }
}

function* loadFilteredPRoducts() {
    try {
        yield delay(1000);
        const productList = yield getProductsFilterFromServer();
        yield put({ type: 'GET_PRODUCTS_SUCCESS', payload: productList});
    } catch (e) {
        yield put({ type: 'GET_PRODUCTS_FAILURE', payload: e});
    }
}

function* watchGetProducts() {
    yield takeLatest('GET_PRODUCTS', loadProducts);
}

function* watchGetFilteredProducts() {
    yield takeLatest('GET_RPODUCTS_FILTERED', loadFilteredPRoducts);
}

function* watchModifyProduct() {
    yield takeLatest('MODIFY_PRODUCT', modifyProductFunction);
}


export default function* rootSaga() {
    yield [
        watchGetProducts(),
        watchGetFilteredProducts(),
        watchModifyProduct()
    ]
}

/*
 {
            productid: 1,
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
            productid: 2,
            categoryid: 2,
            shopid: 2,
            name: 'Mleko mlekowita',
            description: 'Bardzo dobre mleko od krowy. Troche świeże troche nie świeże.',
            price: 2.34,
            currency: 'PLN',
            link: 'https://www.tabele-kalorii.pl/photo-1757559/Mleko-1-5-tl-Mlekovita.jpg',
            url: 'https://www.tabele-kalorii.pl/photo-1757559/Mleko-1-5-tl-Mlekovita.jpg'
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
            productid: 4,
            categoryid: 2,
            shopid: 2,
            name: 'Makaron żytni',
            description: 'Makaronik pryma sort.',
            price: 6.19,
            currency: 'PLN',
            link: 'https://www.straganzdrowia.pl/environment/cache/images/0_0_productGfx_e6e05437a93231eba7a52d91f84fbedb.jpg',
            url: 'https://www.straganzdrowia.pl/environment/cache/images/0_0_productGfx_e6e05437a93231eba7a52d91f84fbedb.jpg'
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
            productid: 6,
            categoryid: 2,
            shopid: 2,
            name: 'Mleko mlekowita',
            description: 'Bardzo dobre mleko od krowy. Troche świeże troche nie świeże.',
            price: 2.34,
            currency: 'PLN',
            link: 'https://www.tabele-kalorii.pl/photo-1757559/Mleko-1-5-tl-Mlekovita.jpg',
            url: 'https://www.tabele-kalorii.pl/photo-1757559/Mleko-1-5-tl-Mlekovita.jpg'
        },
        {
            productid: 9,
            categoryid: 1,
            shopid: 1,
            name: 'Chleb żytni na zakwasie',
            description: 'Chleb taki bardzo smaczny, jak sama nazwa mówi za zakwasie robiony.',
            price: 2.37,
            currency: 'PLN',
            link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4f5GNx1Zl4jSyKbltAof0otq3_qn4ZMeBp9TfL86AvOjhGksncA',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4f5GNx1Zl4jSyKbltAof0otq3_qn4ZMeBp9TfL86AvOjhGksncA'
        },
        {
            productid: 10,
            categoryid: 2,
            shopid: 2,
            name: 'Chleb suchy dla konia',
            description: 'Bardzo suchy chleb dla konia. Idealny dla konia',
            price: 1.24,
            currency: 'PLN',
            link: 'http://konie.t8.pl/media/images/suchy_chleb.jpg',
            url: 'http://konie.t8.pl/media/images/suchy_chleb.jpg'
        },
        {
            productid: 7,
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
            productid: 8,
            categoryid: 2,
            shopid: 2,
            name: 'Makaron żytni',
            description: 'Makaronik pryma sort.',
            price: 6.19,
            currency: 'PLN',
            link: 'https://www.straganzdrowia.pl/environment/cache/images/0_0_productGfx_e6e05437a93231eba7a52d91f84fbedb.jpg',
            url: 'https://www.straganzdrowia.pl/environment/cache/images/0_0_productGfx_e6e05437a93231eba7a52d91f84fbedb.jpg'
        }
 */
