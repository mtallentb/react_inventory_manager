import * as actionTypes from '../actions'
import updateObject from '../utility'
import axios from 'axios'


const initialState = {
    isAuthed: false,
    token: null,
    showChart: false,
    showContainers: true,
    userID: null,
    error: null,
    loading: false,
    products: [],
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
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, { 
        isAuthed: false,
        token: null 
    })
}

const showChart = (state, action) => {
    return updateObject(state, { 
        showChart: true,
        showContainers: false 
    })
}

const hideChart = (state, action) => {
    return updateObject(state, { 
        showChart: false,
        showContainers: true
    })
}

const loadProducts = (state, action) => {
    return updateObject(state, { products: action.products })
}

const updateProducts = (state, action) => {
    const updatedProducts = state.products.concat({
        product_name: action.product_name,
        description: action.description,
        price: action.price,
        quantity: action.quantity
    })
    return updateObject(state, { products: updatedProducts })
}

const addToCart = (state, action) => {
    let newCart = state.cart.concat(action.product)
    return updateObject(state, { cart: newCart })
}

const editProduct = (state, action) => {
    return updateObject(state, { products: action.products })
}

const deleteProduct = (state, action) => {
    axios({
        method: 'delete',
        url: 'https://ancient-reef-75174.herokuapp.com/products/' + action.productID,
        headers: { 'Authorization': state.token }
    })
    return state
}

const removeFromCart = (state, action) => {
    const newCart = [...state.cart]
    newCart.splice(action.index, 1)
    return updateObject(state, { cart: newCart })
}

const clearCart = (state, action) => {
    return updateObject(state, { cart: [] })
}

const updateQuantity = (state, action) => {
    axios({
        method: 'patch',
        url: 'https://ancient-reef-75174.herokuapp.com/products/' + action.productID,
        data: { quantity: action.quantity },
        headers: { 'Authorization': state.token }
    })
        .then(() => {
            axios({
                method: 'get',
                url: 'https://ancient-reef-75174.herokuapp.com/products/',
                headers: { 'Authorization': state.token }
            })
                .then((response) => {
                    console.log(response)
                    let newArr = response.data
                    console.log('New Array: ' + newArr)
                    return updateObject(state, { products: newArr })
                })
        })
    return state
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.LOAD_PRODUCTS: return loadProducts(state, action)
        case actionTypes.UPDATE_PRODUCTS: return updateProducts(state, action)
        case actionTypes.ADD_TO_CART: return addToCart(state, action)
        case actionTypes.DELETE_PRODUCT: return deleteProduct(state, action)
        case actionTypes.EDIT_PRODUCT: return editProduct(state, action)
        case actionTypes.REMOVE_FROM_CART: return removeFromCart(state, action)
        case actionTypes.CLEAR_CART: return clearCart(state, action)
        case actionTypes.UPDATE_QUANTITY: return updateQuantity(state, action)
        case actionTypes.SHOW_CHART: return showChart(state, action)
        case actionTypes.HIDE_CHART: return hideChart(state, action)
        default: return state
    }
}

export default reducer