export function getProducts() {
    return {
        type: 'GET_PRODUCTS'
    };
}

export function getProductsAll() {
    return {
        type: 'GET_PRODUCTS_ALL'
    };
}

export function getFilteredProducts(shops, categories, name) {
    return {
        type: 'GET_FILTERED_PRODUCTS',
        shops,
        categories,
        name
    };
}

export function addProduct(product) {
    return {
        type: 'ADD_PRODUCT',
        product
    };
}

export function modifyProduct(product) {
    return {
        type: 'MODIFY_PRODUCT',
        product
    };
}

export function addFavourite(favouriteId, userId, name) {
    return {
        type: 'ADD_FAVOURITE',
        favouriteId,
        userId,
        name
    }
}

export function addFavouriteProduct(productId, favouriteId) {
    return {
        type: 'ADD_FAVOURITE_PRODUCT',
        productId,
        favouriteId
    }
}

export function deleteFavouriteProduct(productId, favouriteId, userId) {
    return {
        type: 'DELETE_FAVOURITE_PRODUCT',
        productId,
        favouriteId,
        userId
    }
}

export function getFavourites(userid) {
    return {
        type: 'GET_FAVOURITES',
        userid
    };
}

export function getCategories() {
    return {
        type: 'GET_CATEGORIES'
    }
}

export function getShops() {
    return {
        type: 'GET_SHOPS'
    }
}

export function getUser(login, pass) {
    return {
        type: 'GET_USER',
        login,
        pass
    }
}

export function modifyUser(user) {
    return {
        type: 'MODIFY_USER',
        user
    }
}

export function modifyUserPassword(user) {
    return {
        type: 'MODIFY_USER_PASSWORD',
        user
    }
}

export function addUser(user) {
    return {
        type: 'ADD_USER',
        user
    }
}

export function logout() {
    return {
        type: 'LOGOUT'
    }
}
