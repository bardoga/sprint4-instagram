import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'


import { storyReducer } from './story.reducer.js'


const rootReducer = combineReducers({
    storyModule: storyReducer,
    // userModule: userReducer,
    // systemModule: systemReducer,
    // reviewModule: reviewReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))