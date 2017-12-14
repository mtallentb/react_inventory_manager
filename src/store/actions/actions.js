import axios from 'axios';

export const SHOW_LOGIN = 'SHOW_LOGIN';
export const HIDE_LOGIN = 'HIDE_LOGIN';
export const SHOW_CREATE_ACCOUNT = 'SHOW_CREATE_ACCOUNT';
export const HIDE_CREATE_ACCOUNT = 'HIDE_CREATE_ACCOUNT';
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';

export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';


export const showLogin = () => {
    return {
        type: SHOW_LOGIN
    }
}

export const hideLogin = () => {
    return {
        type: HIDE_LOGIN
    }
}

export const showCreateAccount = () => {
    return {
        type: SHOW_CREATE_ACCOUNT
    }
}

export const hideCreateAccount = () => {
    return {
        type: HIDE_CREATE_ACCOUNT
    }
}

export const createAccount = () => {
    return {
        type: CREATE_ACCOUNT
    }
}

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
        type: AUTH_SUCCESS,
        token: token
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    return {
        type: AUTH_LOGOUT
    };
};

export const loadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products: products
    };
};

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        product: product
    };
};

export const updateProducts = (product) => {
    return {
        type: UPDATE_PRODUCTS,
        product: product
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post("http://localhost:5000/authenticate", {
                email: email,
                password: password
            })
            .then((response) => {
                console.log(response.data);
                dispatch(authSuccess(response.data.auth_token));
                axios({
                    method: 'get',
                    url: 'http://localhost:5000/products/',
                    headers: { 'Authorization': response.data.auth_token }
                })
                    .then((response) => {
                        console.log(response.data);
                        dispatch(loadProducts(response.data));
                    });
            })
            .then(dispatch({ type: HIDE_LOGIN }))
            .catch((error) => {
                console.log(error);
                dispatch(authFail(error));
            });
    }
}


export const logout = () => {
    return dispatch => dispatch(authLogout());
};
