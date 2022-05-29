import { combineReducers } from 'redux'

import { storyReducer } from './reducers/story.reducer'

export const rootReducer = combineReducers({
    storyModule: storyReducer
})