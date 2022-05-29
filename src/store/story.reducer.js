const initialState = {
    storys: [],
    lastRemovedStory: null
}

export function storyReducer(state = initialState, action) {
    var newState = state
    var storys
    switch (action.type) {
        case 'SET_STORY':
            newState = {...state, storys: action.storys }
            break
        case 'REMOVE_STORY':
            const lastRemovedStory = state.storys.find(story => story._id === action.storyId)
            storys = state.storys.filter(story => story._id !== action.storyId)
            newState = {...state, storys, lastRemovedStory }
            break
        case 'ADD_STORY':
            newState = {...state, storys: [...state.storys, action.story] }
            break
            // case 'UPDATE_CAR':
            //     storys = state.storys.map(STORY => (STORY._id === action.STORY._id)? action.STORY : STORY)
            //     newState = { ...state, storys}
            //     break
            // case 'ADD_TO_CART':
            //     newState = { ...state, cart:[...state.cart, action.STORY]}
            //     break
            // case 'REMOVE_FROM_CART':
            //     cart = state.cart.filter(STORY => STORY._id !== action.carId)
            //     newState = { ...state, cart}
            //     break
            // case 'CLEAR_CART':
            //     newState = { ...state, cart: []}
            //     break
            // case 'UNDO_REMOVE_CAR':
            //     if (state.lastRemovedCar) {
            //         newState = { ...state, storys: [...state.storys, state.lastRemovedCar], lastRemovedCar: null}
            //     }
        default:
    }
    // For debug:
    window.storyState = newState
        // console.log('Prev State:', state)
        // console.log('Action:', action)
        // console.log('New State:', newState)
    return newState

}