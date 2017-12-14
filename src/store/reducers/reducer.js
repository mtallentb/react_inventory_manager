import * as actionTypes from '../actions/actions';
import updateObject from '../utility';

const initialState = {
    isAuthed: false,
    cart: [],
    showLogin: false,
    showCart: false,
    showCreateAccount: false,
    showSellProducts: false,
    showAddToStock: false,
    showInventory: false,
    showCreateAProduct: false
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SHOW_LOGIN:
            return updateObject(state, { showLogin: true });
        case actionTypes.HIDE_LOGIN:
            return updateObject(state, { 
                isAuthed: true, 
                showLogin: false 
            });
        case actionTypes.SHOW_CREATE_ACCOUNT:
            return updateObject(state, { showCreateAccount: true });
        case actionTypes.AUTH_START:
            return updateObject(state, { token: action.token });
        case actionTypes.HIDE_CREATE_ACCOUNT:
            return updateObject(state, {
                isAuthed: true,
                showCreateAccount: false
            });
        case actionTypes.ADD_TO_CART:
            let newCart = state.cart.concat(action.product);
            return updateObject(state, { cart: newCart });
        default:
            return state;
            
    }
}

export default reducer;