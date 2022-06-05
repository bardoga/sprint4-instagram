import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { storyService } from '../services/story.service'
import { loadStorys } from '../store/actions/story.action.js'
import { StoryPreview } from '../cmps/story-preview'
import { loadUsers } from '../store/actions/user.action.js'
import { userService } from '../services/user.service.js'




export const InstaApp = () => {

    const { storys } = useSelector((storeState) => storeState.storyModule)
    const dispatch = useDispatch()

    useEffect(() => {
        document.body.scrollTop = 0;
        dispatch(loadStorys())
        dispatch(loadUsers())
    }, [])


    if (!storys) return <div>Loading...</div>
    return (
        <section className="insta-app">
            <div className="storys-wrapper">
                <div className="story-username">
                    {storys.map(story => <StoryPreview story={story} key={story._id} />)}
                </div>

            </div>
        </section>
    )
}
