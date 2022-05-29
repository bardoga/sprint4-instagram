import React from 'react';
import { Link, NavLink } from 'react-router-dom'

import { storyService } from '../services/story.service'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { FavoriteBorder, Textsms, LocationOnOutlined, PropaneSharp } from '@mui/icons-material'


export const StoryDetails = (props) => {

    const [story, setStory] = useState(null)
    const params = useParams()

    const setShowModal = () => {
        // params.push.history('/gram')
        console.log(params)
    }



    useEffect(() => {
        storyService.getById((params.id))
            .then((story) => {
                setStory(story)
            })
    }, [])
    // console.log('your story is ', story.imgUrl)
    if (!story) return <div>Loading...</div>
    const { comments } = story
    // let len = comments.likedBy
    console.log(comments)
    return (
        // <section className="story-id">
        <>
            {/* <p>you are here aswell</p> */}
            {/* <div className="details-background" ref={detailRef} onClick={closeDetails}> */}
            <div className="details-background" >
                {/* <div className="details-wrapper" showDetails={showDetails}> */}
                <div className="details-wrapper">
                    <div className="details-inner">
                        <div className="details-content">
                            <div className="left-side-img">
                                <img src={story.imgUrl} alt="" />
                                <Link to={'/gram'}>
                                    <MdClose onClick={() => setShowModal()} className="modal-close-button"></MdClose>
                                </Link>
                            </div>
                            <div className="chatbox">
                                <p className='bold-me'>{story.by.fullname}</p>
                                <p className='underline-me unbold-me'>{story.loc.name}</p>
                                <div className="inner-chat-box">

                                    {comments.map(comment => {
                                        return <div className="individual-comments" key={comment.id}>
                                            {/* <p className='bold-me'>{comment.txt}</p> */}
                                            <p><span className='bold-me underlineme'>{comment.by.fullname}</span> {comment.txt}</p>
                                            {/* <p key={comment.likedBy.id}>{comment.likedBy.length} likes</p> */}
                                            <span className='cursor-helper align-right'><FavoriteBorder /></span>
                                        </div>
                                    })}
                                </div>
                            <div className="details-comment-section">            {/*CHANGE TO INPUT LATER AND ADD 
                                                                    COMMENT TO EXISTING STORY-ARRAY-COMMENTS */}
                                <form className='details-input-comments'></form>
                                {/* <input type="text" name='text' id='text' datatype='preview-text' placeholder='Add a comment...' /> */}
                                <textarea placeholder='Add a comment...' aria-label='Add a comment...' autoComplete='off' autoCorrect='off' name="text" id="text" rows='2' style={{ height: '18px', width:'90%'}} ></textarea>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <p>{story}</p> */}
            {/* </section> */}
        </>
    )
}