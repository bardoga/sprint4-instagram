import { userService } from "../../services/user.service"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"


export function loadUsers() {
    return async(dispatch) => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
            showErrorMsg('cannot get users')
        }
    }
}


export function login(credentials) {
    return async(dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.error('Error:', err)
            throw new Error(err)
        }
    }
}
export function signup(credentials) {
    debugger
    return async dispatch => {
        try {
            const user = await userService.signup(credentials)
            console.log(user)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('ERROR', err)
            throw new Error(err)
        }
    }
}

export function logout() {
    // Action Creator
    return (dispatch) => {
        userService
            .logout()
            .then(() => {
                dispatch({
                    type: 'SET_USER',
                    user: null,
                })
            })
            .catch((err) => {
                console.error('Error:', err)
            })
    }
}


// export function saveUser(user) {
//     return async dispatch => {
//         try {
//             const savedUser = await userService.save(user)
//                 (user._id) ? dispatch(getActionUpdateUser(user._id)) : dispatch(getActionAddUser(user._id))
//             showSuccessMsg('user saved')
//         } catch (err) {
//             console.log('Error', err)
//             showErrorMsg('couldnt save user')
//         }
//     }
// }