import { useSyncExternalStore } from "react"
import { storageService } from "./async-storage.service"
import { utilService } from "./utils.service"

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
        const user = users.find(user => user.email === userCred.emailuser || user.username === userCred.emailuser &&
            user.password === userCred.password)
        if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    })
}

async function signup(userCred) {
    console.log('userCred:', userCred)
    const user = await storageService.post('user', userCred)
        // return saveLocalUser(user)
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

const user = {
        "_id": utilService.makeId(),
        "username": "bobo",
        "password": "ilovebobo123",
        "fullname": "bobo_1",
        "imgUrl": "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
        "createdAt": Date.now(),
        "following": [{
            "_id": "u106",
            "fullname": "Dob",
            "imgUrl": "http://some-img"
        }],
        "followers": [{
            "_id": "u105",
            "fullname": "Bob",
            "imgUrl": "http://some-img"
        }],
        "savedStoryIds": ["s104", "s111", "s123"]
    }
    // userService.signup(user)
    // userService.login(user)
    // userService.logout()