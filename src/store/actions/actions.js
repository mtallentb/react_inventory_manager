import axios from 'axios'
import * as actions from './types'

export const showLogin = () => ({ type: actions.SHOW_LOGIN })
export const hideLogin = () => ({ type: actions.HIDE_LOGIN })
export const showCreateAccount = () => ({ type: actions.SHOW_CREATE_ACCOUNT })
export const hideCreateAccount = () => ({ type: actions.HIDE_CREATE_ACCOUNT })
export const createAccount = () => ({ type: actions.CREATE_ACCOUNT })
export const authStart = () => ({ type: actions.AUTH_START })

export const authSuccess = (token) => {
    return {
        type: actions.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => ({ type: actions.AUTH_LOGOUT })

export const loadProducts = (products) => {
    return {
        type: actions.LOAD_PRODUCTS,
        products: products
    }
}

export const showChart = () => ({ type: actions.SHOW_CHART })
export const hideChart = () => ({ type: actions.HIDE_CHART })

export const addToCart = (product) => {
    return {
        type: actions.ADD_TO_CART,
        product: product
    }
}

export const updateProducts = (product_name, description, price, quantity) => {
    return {
        type: actions.UPDATE_PRODUCTS,
        product_name: product_name,
        description: description,
        price: price,
        quantity: quantity
    }
}

export const editProduct = (products) => {
    return {
        type: actions.EDIT_PRODUCT,
        products: products
    }
}

export const deleteProduct = (productID) => {
    return {
        type: actions.DELETE_PRODUCT,
        productID: productID
    }
}

export const removeFromCart = (index) => {
    return {
        type: actions.REMOVE_FROM_CART,
        index: index
    }
}

export const clearCart = () => ({ type: actions.CLEAR_CART })


export const incrementQuantity = (productID, quantity) => {
    return {
        type: actions.INCREMENT_QUANTITY,
        productID: productID,
        quantity: quantity
    }
}

export const updateQuantity = (product_name, productID, quantity) => {
    return {
        type: actions.UPDATE_QUANTITY,
        product_name: product_name,
        productID: productID,
        quantity: quantity
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        axios
            .post("https://ancient-reef-75174.herokuapp.com/authenticate", {
                email: email,
                password: password
            })
            .then((response) => {
                console.log(response.data)
                dispatch(authSuccess(response.data.auth_token))
                axios({
                    method: 'get',
                    url: 'https://ancient-reef-75174.herokuapp.com/products/',
                    headers: { 'Authorization': response.data.auth_token }
                })
                    .then((response) => {
                        console.log(response.data)
                        dispatch(loadProducts(response.data))
                    })
            })
            .then(dispatch({ type: actions.HIDE_LOGIN }))
            .catch((error) => {
                console.log(error)
                dispatch(authFail(error))
            })
    }
}

export const logout = () => {
    return dispatch => dispatch(authLogout())
}
