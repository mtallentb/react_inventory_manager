import * as actionTypes from '../actions/actions';
import updateObject from '../utility';
import axios from 'axios';
import { hideCreateProduct } from '../actions/actions';

const initialState = {
    isAuthed: false,
    token: null,
    userID: null,
    error: null,
    loading: false,
    products: null,
    cart: []
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        isAuthed: true,
        token: action.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, { 
        isAuthed: false,
        token: null 
    });
}

const loadProducts = (state, action) => {
    return updateObject(state, { products: action.products });
}

const updateProducts = (state, action) => {
    const updatedProducts = state.products.concat({
        product_name: action.product_name,
        description: action.description,
        price: action.price,
        quantity: action.quantity
    })
    return updateObject(state, { products: updatedProducts });
}

const addToCart = (state, action) => {
    let newCart = state.cart.concat(action.product);
    return updateObject(state, { cart: newCart });
}

const editProduct = (state, action) => {
    return updateObject(state, { products: action.products });
}

const deleteProduct = (state, action) => {
    axios({
        method: 'delete',
        url: 'http://localhost:5000/products/' + action.productID,
        headers: { 'Authorization': state.token }
    })
    .then(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/products/',
            headers: { 'Authorization': state.token }
        });
    });
    return state;
};

const removeFromCart = (state, action) => {
    const newCart = [...state.cart];
    newCart.splice(action.index, 1);
    return updateObject(state, { cart: newCart });
};

const incrementQuantity = (state, action) => {
    console.log(action.quantity);
    axios({
        method: 'patch',
        url: 'http://localhost:5000/products/' + action.productID,
        data: { quantity: (action.quantity + 1) },
        headers: { 'Authorization': state.token }
    })
        .then(() => {
            axios({
                method: 'get',
                url: 'http://localhost:5000/products/',
                headers: { 'Authorization': state.token }
            })
                .then((response) => {
                    console.log(response);
                    let newArr = response.data;
                    console.log('New Array: ' + newArr);
                    return updateObject(state, { products: newArr });
                });
        });
        return state;
};

const updateQuantity = (state, action) => {
    axios({
        method: 'patch',
        url: 'http://localhost:5000/products/' + action.productID,
        data: { quantity: action.quantity },
        headers: { 'Authorization': state.token }
    })
        .then(() => {
            axios({
                method: 'get',
                url: 'http://localhost:5000/products/',
                headers: { 'Authorization': state.token }
            })
                .then((response) => {
                    console.log(response);
                    let newArr = response.data;
                    console.log('New Array: ' + newArr);
                    return updateObject(state, { products: newArr });
                });
        });
    return state;
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.LOAD_PRODUCTS: return loadProducts(state, action);
        case actionTypes.UPDATE_PRODUCTS: return updateProducts(state, action);
        case actionTypes.ADD_TO_CART: return addToCart(state, action);
        case actionTypes.DELETE_PRODUCT: return deleteProduct(state, action);
        case actionTypes.EDIT_PRODUCT: return editProduct(state, action);
        case actionTypes.REMOVE_FROM_CART: return removeFromCart(state, action);
        case actionTypes.INCREMENT_QUANTITY: return incrementQuantity(state, action);
        case actionTypes.UPDATE_QUANTITY: return updateQuantity(state, action);
        default: return state;
    }
}

export default reducer;