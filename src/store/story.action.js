import { storyService } from "../services/story.service"

var subscriber

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
        type: 'UPDATE_STORY',
        story
    }
}

export function loadStorys() {
    return dispatch => {
        storyService.query()
            .then(storys => {
                console.log('storys from DB:', storys)
                dispatch({
                    type: 'SET_STORYS',
                    storys
                })
            })
            .catch(err => {
                // showErrorMsg('Cannot load storys')
                console.log('Cannot load storys', err)
            })

        //     if (subscriber) storyService.unsubscribe(subscriber)
        //     subscriber = (ev) => {
        //         console.log('Got notified', ev.data)
        //         dispatch(ev.data)
        //     }
        //     storyService.subscribe(subscriber)
        // }
    }
}

export function removeStory(StoryId) {
    return async(dispatch) => {
        try {
            await storyService.remove(StoryId)
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveStory(StoryId))
                // showSuccessMsg('story removed')
        } catch (err) {
            // showErrorMsg('Cannot remove story')
            console.log('Cannot remove story', err)
        }
    }
}

export function addStory(story) {
    return (dispatch) => {

        storyService.save(story)
            .then(savedStory => {
                console.log('Added story', savedStory);
                dispatch(getActionAddStory(savedStory))
                    // showSuccessMsg('story added')
            })
            .catch(err => {
                // showErrorMsg('Cannot add story')
                console.log('Cannot add story', err)
            })
    }
}

export function updateStory(story) {
    return (dispatch) => {
        storyService.save(story)
            .then(savedStory => {
                console.log('Updated story:', savedStory);
                dispatch(getActionUpdateStory(savedStory))
                    // showSuccessMsg('story updated')
            })
            .catch(err => {
                // showErrorMsg('Cannot update story')
                console.log('Cannot save story', err)
            })
    }
}