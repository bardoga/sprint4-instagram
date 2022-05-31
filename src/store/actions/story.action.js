import { storyService } from "../../services/story.service"

export function getActionRemoveStory(storyId) {
    return {
        type: 'REMOVE_STORY',
        storyId
    }
}
export function getActionAddStory(story) {
    return {
        type: 'ADD_STORY',
        story
    }
}
export function getActionUpdateStory(story) {
    return {
        type: 'SAVE_STORY',
        story
    }
}

// var subscriber


export function loadStorys() {
    return dispatch => {
        return storyService.query()
            .then(storys => {
                const action = {
                    type: 'SET_STORYS',
                    storys
                }
                dispatch(action)
            })
            .catch(err => {
                console.error('ERROR:', err)
            })
    }
}

// export function loadStorys() { // Action Creator
//     return async(dispatch, getState) => {
//         try {
//             const filterBy = getState().storyModule.filterBy
//             const storys = await storyService.query(filterBy)
//             dispatch({ type: 'SET_STORYS', storys })
//         } catch (err) {
//             console.error('Error:', err)
//                 // showErrorMsg('Cannot load storys')
//         }
//         if (subscriber) storyService.unsubscribe(subscriber)
//         subscriber = (ev) => {
//             console.log('Got notified', ev.data)
//             dispatch(ev.data)
//         }
//         storyService.subscribe(subscriber)
//     }
// }

export function removeStory(storyId) {
    return (dispatch, getTheState) => {
        console.log('The state is', getTheState())
        storyService.remove(storyId)
            .then(() => {
                console.log('DELETED SUCCESSFULLU')
                dispatch({
                        type: 'REMOVE_STORY',
                        storyId
                    })
                    .catch(err => {
                        console.error('ERROR:', err)
                    })
            })
    }
}


export function saveStory(story) {
    return dispatch => {
        const actionType = (story._id) ? 'UPDATE_STORY' : 'ADD_STORY'
        storyService.save(story)
            .then(savedStory => {
                dispatch({
                        type: actionType,
                        story: savedStory
                    })
                    .catch(err => {
                        console.error('ERROR:', err)
                    })
            })
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        return dispatch({
            type: 'SET_FILTERBY',
            filterBy
        })

    }
}