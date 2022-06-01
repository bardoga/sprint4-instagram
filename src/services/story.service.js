import { storageService } from './async-storage.service.js'
import { utilService } from './utils.service.js'
import { userService } from './user.service.js'
import { getActionRemoveStory, getActionAddStory, getActionUpdateStory } from '../store/actions/story.action'

const STORAGE_KEY = 'story'
const storyChannel = new BroadcastChannel('storyChannel')
const guestUserPhoto = 'http://cdn.onlinewebfonts.com/svg/img_258083.png'

export const storyService = {
    query,
    getById,
    remove,
    save,
    createStory,
    subscribe,
    unsubscribe

}

window.cs = storyService

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
        // return axios.get(`/api/story/${storyId}`)
}

export function createStory(txt, img, user) {

    let story = {
        "_id": utilService.makeId(),
        "txt": txt,
        "imgUrl": img.imgUrl, //Can be an array if decide to support multiple imgs
        "createdAt": Date.now(),
        "by": {
            "_id": (user) ? user._id : 'guest_id',
            "fullname": (user) ? user.fulname : 'guest',
            "imgUrl": (user) ? user.imgUrl : guestUserPhoto
        },
        "loc": {
            "lat": '',
            "lng": '',
            "name": ''
        },
        "comments": [],
        "likedBy": [],
        "tags": ['fun']

    }
    save(story)
}

async function remove(storyId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    await storageService.remove(STORAGE_KEY, storyId)
    storyChannel.postMessage(getActionRemoveStory(storyId))
}
async function save(story) {
    var savedstory
    if (story._id) {
        savedstory = await storageService.put(STORAGE_KEY, story)
        storyChannel.postMessage(getActionUpdateStory(savedstory))

    } else {
        // Later, owner is set by the backend
        // story.owner = userService.getLoggedinUser()
        savedstory = await storageService.post(STORAGE_KEY, story)
        storyChannel.postMessage(getActionAddStory(savedstory))
    }
    return savedstory
}

function subscribe(listener) {
    storyChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
    storyChannel.removeEventListener('message', listener)
}


// let jsonn = {
//     "_id": utilService.makeId(),
//     "txt": "Sweden",
//     "imgUrl": "https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/1bbe7/Twitter-NFT-profile.jpg", //Can be an array if decide to support multiple imgs
//     "createdAt": Date.now(),
//     "by": {
//         "_id": utilService.makeId(),
//         "fullname": "nature",
//         "imgUrl": "https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/1bbe7/Twitter-NFT-profile.jpg"
//     },
//     "loc": {
//         "lat": 11.11,
//         "lng": 22.22,
//         "name": "Sweden"
//     },
//     "comments": [],
//     "likedBy": [{
//             "_id": utilService.makeId(),
//             "fullname": "jeff",
//             "imgUrl": "http://some-img"
//         },
//         {
//             "_id": utilService.makeId(),
//             "fullname": "Dob",
//             "imgUrl": "http://some-img"
//         }
//     ],
//     "tags": ["fun", "kids", 'animals']
// }

// storageService.post(STORAGE_KEY, jsonn).then(x => console.log(x))

//TEST DATA

// storageService.post(STORAGE_KEY, JSON.parse({
//     "_id": "s101",
//     "txt": "Best trip ever",
//     "imgUrl": "http://some-img", //Can be an array if decide to support multiple imgs
//     "createdAt": 123543452,
//     "by": {
//         "_id": "u101",
//         "fullname": "Ulash Ulashi",
//         "imgUrl": "http://some-img"
//     },
//     "loc": {
//         "lat": 11.11,
//         "lng": 22.22,
//         "name": "Tel Aviv"
//     },
//     "comments": [{
//             "id": "c1001",
//             "by": {
//                 "_id": "u105",
//                 "fullname": "Bob",
//                 "imgUrl": "http://some-img"
//             },
//             "txt": "good one!",
//             "likedBy": [ // Optional
//                 {
//                     "_id": "u105",
//                     "fullname": "Bob",
//                     "imgUrl": "http://some-img"
//                 }
//             ]
//         },
//         {
//             "id": "c1002",
//             "by": {
//                 "_id": "u106",
//                 "fullname": "Dob",
//                 "imgUrl": "http://some-img"
//             },
//             "txt": "not good!",
//         }
//     ],
//     "likedBy": [{
//             "_id": "u105",
//             "fullname": "Bob",
//             "imgUrl": "http://some-img"
//         },
//         {
//             "_id": "u106",
//             "fullname": "Dob",
//             "imgUrl": "http://some-img"
//         }
//     ],
//     "tags": ["fun", "kids"]
// })).then(x => console.log(x))