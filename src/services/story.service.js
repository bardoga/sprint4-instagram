import { storageService } from './async-storage.service.js'
import { utilService } from './utils.service.js'
import { getActionRemoveStory, getActionAddStory, getActionUpdateStory } from '../store/story.action.js'
import { MarkEmailRead } from '@mui/icons-material'

const STORAGE_KEY = 'story'
const storyChannel = new BroadcastChannel('storyChannel')


export const storyService = {
    query,
    getById,
    remove,
    save,
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


let jsonn = {
    "_id": utilService.makeId(),
    "txt": "beautiful!",
    "imgUrl": "https://www.thesprucepets.com/thmb/M86UKD8yBeEJTw8XCCm33YC9IYM=/1080x1080/filters:no_upscale():max_bytes(150000):strip_icc()/31036905_1213695242100671_126506084155260928_n-5b0de83f3de42300373080d2.jpg", //Can be an array if decide to support multiple imgs
    "createdAt": Date.now(),
    "by": {
        "_id": utilService.makeId(),
        "fullname": "dog_lover",
        "imgUrl": "http://some-img"
    },
    "loc": {
        "lat": 11.11,
        "lng": 22.22,
        "name": "Somewhere"
    },
    "comments": [{
            "id": "c1001",
            "by": {
                "_id": "u105",
                "fullname": "Bob",
                "imgUrl": "http://some-img"
            },
            "txt": "amazing!",
            "likedBy": [ // Optional
                {
                    "_id": "u105",
                    "fullname": "Bob",
                    "imgUrl": "http://some-img"
                }
            ]
        },
        {
            "id": "c1002",
            "by": {
                "_id": "u106",
                "fullname": "Dob",
                "imgUrl": "http://some-img"
            },
            "txt": "i am rich!",
        },
    ],
    "likedBy": [{
            "_id": utilService.makeId(),
            "fullname": "jeff",
            "imgUrl": "http://some-img"
        },
        {
            "_id": utilService.makeId(),
            "fullname": "Dob",
            "imgUrl": "http://some-img"
        }
    ],
    "tags": ["fun", "kids", 'animals']
}

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