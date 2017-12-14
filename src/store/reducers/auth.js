import * as actionTypes from '../actions/actions';
import updateObject from '../utility';

const initialState = {
    token: null,
    userID: null,
    error: null,
    loading: false,
    products: null
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
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
    return updateObject(state, { token: null });
}

const loadProducts = (state, action) => {
    return updateObject(state, { products: action.products });
}

const updateProducts = (state, action) => {
    let updatedProducts = state.products.concat(action.product);
    return updateObject(state, { products: updatedProducts });
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.LOAD_PRODUCTS: return loadProducts(state, action);
        case actionTypes.UPDATE_PRODUCTS: return updateProducts(state, action);
        default: return state;
    }
}

export default reducer;