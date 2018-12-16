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
        const response = fetch(`${SERWER_LOCAL}/api/product/promotion`,{
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
    }
};

const getProductsFilterFromServer = (categories, shops, name) => {
    try {
        console.log('getting filtered products');
        const response = fetch(`${SERWER_LOCAL}/api/product/products/filter`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categories: categories,
                shops: shops,
                name: name
            })
        });
        console.log(response);
        console.log(response.body);
        return JSON.parse(response.body);
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`);
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
        });
        console.log(response);
        console.log(response.body);
        return response.status;
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
        });
        console.log(response);
        console.log(response.body);
        return response.status;
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`)
    }
};

function* addProductFunction (action) {
    try {
        yield addProduct(action.product);
        yield put({ type: 'GET_PRODUCTS'});
    } catch (e) {
        yield put({ type: 'ADD_PRODUCT_FAILURE', payload: e});
    }
}

function* modifyProductFunction (action) {
    try {
        yield modifyProduct(action.product);
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
        watchGetProducts(),
        watchGetFilteredProducts(),
        watchModifyProduct(),
        watchAddProduct()
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
        ---------------------
        ,
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
        },
        {
            productid: 1,
            categoryid: 1,
            shopid: 'Biedronka',
            name: 'Jogurt brzoskwiniowy Jogobella, 500ml',
            description: 'Chleb taki bardzo smaczny, lekko pszenny lekko nie pszenny.',
            price: 2.69,
            currency: 'PLN',
            link: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg',
            url: 'http://www.polskadelikatesser.eu/591-large_default/zott-jogurt-jogobella-brzoskwinia-150g.jpg'
        },
        {
            productid: 3,
            categoryid: 1,
            shopid: 'Tesco',
            name: 'Mleko Wypasione, 1l',
            description: 'Chleb żytni z nutką ziarenek żytnihc. O smaku żytnim.',
            price: 2.99,
            currency: 'PLN',
            link: 'http://cdn.przepisy100.pl/v/pl/7/7e770033f9e5bf87371dd35037e80e3a.jpg',
            url: 'http://www.mlekovita.com.pl/uploads/products/75/kar_mleko_wypasione_red_1000ml-w02-2_0010.jpg'
        },
        {
            productid: 5,
            categoryid: 1,
            shopid: 'Biedronka',
            name: 'Mleko wypasione, 1l',
            description: 'Chleb taki bardzo smaczny, lekko pszenny lekko nie pszenny.',
            price: 3.19,
            currency: 'PLN',
            link: 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps32480_MRR153791D09_18_6b.jpg',
            url: 'http://www.mlekovita.com.pl/uploads/products/75/kar_mleko_wypasione_red_1000ml-w02-2_0010.jpg'
        }
 */
