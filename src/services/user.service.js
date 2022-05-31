import { useSyncExternalStore } from "react"
import { storageService } from "./async-storage.service"

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'


export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update
}

window.userService = userService

function getUsers() {
    // return httpService.get(`user`)
    return storageService.query('user')
}

async function getById(userId) {
    // const user = await httpService.get(`user/${userId}`)
    const user = await storageService.get('user', userId)
    return user
}


function remove(userId) {
    // return httpService.delete(`user/${userId}`)
    return storageService.remove('user', userId)

}

async function update(user) {
    // user = await httpService.put(`user/${user._id}`, user)
    await storageService.put('user', user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user;
}



async function login(userCred) {
    console.log(userCred)
    return storageService.query(STORAGE_KEY).then(users => {
        const user = users.find(user => user.email === userCred.email &&
            user.password === userCred.password)
        if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    })
}

async function signup(userCred) {
    console.log('userCred:', userCred)
    const user = await storageService.post('user', userCred)
    return saveLocalUser(user)
}


async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN) || 'null')
}

// userService.signup({ email: 'john@com', username: 'john', password: 'ilovejohn123', fullname: 'Muki Ja' })
// userService.login({ username: john, password: john })
// userService.logout()