import * as actionTypes from '../actions'
import updateObject from '../utility'

const initialState = {
    showLogin: false,
    showCart: false,
    showCreateAccount: false
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SHOW_LOGIN: return updateObject(state, { showLogin: true, showCreateAccount: false })
        case actionTypes.HIDE_LOGIN: return updateObject(state, { showLogin: false  })
        case actionTypes.SHOW_CREATE_ACCOUNT: return updateObject(state, { showCreateAccount: true, showLogin: false })
        case actionTypes.AUTH_START: return updateObject(state, { token: action.token })
        case actionTypes.HIDE_CREATE_ACCOUNT: return updateObject(state, { showCreateAccount: false })
        default: return state  
    }
}

export default reducer

