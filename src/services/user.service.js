import { storageService } from "./async-storage.service"
import { utilService } from "./utils.service"
import { httpService } from "./http.service"

import Axios from 'axios'

var axios = Axios.create({ withCredentials: true })

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = (process.env.NODE_ENV === 'production') ?
    '/api/auth/' :
    'http://localhost:3030/api/auth/'

// const BASE_URL = 'http://localhost:3030/api/auth/'



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
const END_POINT = 'user/'

async function getUsers() {
    const users = await httpService.get(END_POINT)
    return users
        // return httpService.get(`user`)
        // return storageService.query('user')
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
        // const user = await storageService.get('user', userId)
    return user
}


function remove(userId) {
    return httpService.delete(`user/${userId}`)
        // return storageService.remove('user', userId)

}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    await storageService.put('user', user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user;
}



async function login(credentials) {
    console.log(credentials)
    const { data } = await axios.post(BASE_URL + 'login', credentials)
    console.log(data)
    const user = data
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return new Promise((resolve, reject) => {
        resolve(credentials)
        reject('wrong credentials')
    })
}

async function signup(userInfo) {
    console.log('user info', userInfo)
    try {
        const { data } = await axios.post(BASE_URL + 'signup', userInfo)
        console.log(data)
        const user = data
        sessionStorage.setItem('loggedinUser', JSON.stringify(user))
        return user
    } catch (err) {
        console.log(err.response.data);
        throw err
    }
}


async function logout() {
    try {
        await axios.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)

    } catch (err) {
        console.log(err)
    }
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN) || 'null')
}



// userService.signup(user)
// userService.login(user)
// userService.logout()