import { userService } from "../../services/user.service"


const initialState = {
    user: userService.getLoggedinUser(),
    users: []
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.user }
        case 'SET_USERS':
            return {...state, users: action.users }
        default:
            return state
    }
}