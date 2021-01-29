import { createStore, combineReducers, applyMiddleware, compose  } from 'redux'
import thunkMiddleware from 'redux-thunk'
import weatherReducer from './weatherReducer'
import notifyReducer from './notifyReducer'

const reducers = combineReducers({
  weather: weatherReducer,
  notify: notifyReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store