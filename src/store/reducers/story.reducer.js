const initialState = {
    storys: [],
    filterBy: {
        name: '',
        inStock: '',
        labels: []
    }
}

export function storyReducer(state = initialState, action) {
    var storys
    switch (action.type) {
        case 'SET_STORYS':
            return {...state, storys: action.storys }
        case 'REMOVE_STORY':
            storys = state.storys.filter(story => story._id !== action.storyId)
            return {...state, storys }
        case 'ADD_STORY':
            storys = [action.story, ...state.storys]
            return {...state, storys }
        case 'UPDATE_STORY':
            storys = state.storys.map(currStory =>
                (currStory._id === action.story._id) ? action.story : currStory)
            return {...state, storys }
        case 'SET_FILTERBY':
            return {...state, filterBy: action.filterBy }
        default:
            return state
    }
}