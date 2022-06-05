import { userService } from "../../services/user.service"


const initialState = {
    user: userService.getLoggedinUser(),
    users: []
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {...state.user, user: action.user }
        case 'SET_USERS':
            return {...state, users: action.users }
            // case 'UPDATE_USER':
            //     users = state.users.map(currUser =>
            //         (currUser._id === action.user._id) ? action.user : currUser)
            //     return {...state, users }
        default:
            return state
    }
}