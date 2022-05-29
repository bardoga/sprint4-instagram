import { storyService } from "../../services/story.service"


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