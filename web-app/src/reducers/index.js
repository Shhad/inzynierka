import { combineReducers } from 'redux'
import product from './productReducer'
import favourite from './favouriteReducers'
import category from './categoryReducer'
import shop from './shopReducer'
import user from './userReducer'

export default combineReducers({
    product,
    favourite,
    category,
    shop,
    user
});
