import { userService } from "../../services/user.service"


export function loadUsers() {
    return async(dispatch) => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}


export function login(credentials) {
    return (dispatch) => {
        userService.login(credentials)
            .then((user) => {
                dispatch({
                    type: 'SET_USER',
                    user,
                })
            })
            .catch((err) => {
                console.log('Error:', err)
            })
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

export function signup(credentials) {
    // Action Creator

    return (dispatch) => {
        userService
            .signup(credentials)
            .then((user) => {
                dispatch({
                    type: 'SET_USER',
                    user,
                })
            })
            .catch((err) => {
                console.error('Error:', err)
            })
    }
}