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

export function addOrder(orderId, userId, name) {
    return {
        type: 'ADD_ORDER',
        orderId,
        userId,
        name
    }
}

export function addOrderProduct(productId, orderId) {
    return {
        type: 'ADD_ORDER_PRODUCT',
        productId,
        orderId
    }
}

export function deleteOrderProduct(productId, orderId, userId) {
    return {
        type: 'DELETE_ORDER_PRODUCT',
        productId,
        orderId,
        userId
    }
}

export function getOrders(userid) {
    return {
        type: 'GET_ORDERS',
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
