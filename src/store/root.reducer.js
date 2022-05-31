import { combineReducers } from 'redux'

import { storyReducer } from './reducers/story.reducer'
import { userReducer } from './reducers/user.reducer'

export const rootReducer = combineReducers({
    storyModule: storyReducer,
    userModule: userReducer
})