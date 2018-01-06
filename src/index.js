import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import authReducer from './store/reducers/authReducer'
import mainReducer from './store/reducers/mainReducer'
import thunk from 'redux-thunk'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    auth: authReducer,
    main: mainReducer
})

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
