import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { storyService } from '../services/story.service'
import { loadStorys, removeStory, addStory, updateStory } from '../store/actions/story.action.js'
import { StoryPreview } from '../cmps/story-preview'




// function _InstaApp({ loadStorys, addStory, updateStory, removeStory, storys }) {
export const InstaApp = (props) => {

    const { storys } = useSelector((storeState) => storeState.storyModule)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(loadStorys())
    }, [])

    console.log('your storys are:', storys)
    return (
        <section className="insta-app">
            <div className="storys-wrapper">
                <div className="story-username">
                    {storys.map(story => <StoryPreview story={story} key={story._id}/>)}
                </div>

            </div>
        </section>
    )
}
