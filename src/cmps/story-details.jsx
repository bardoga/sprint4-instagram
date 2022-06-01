import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { utilService } from '../services/utils.service';
import { loadStorys, saveStory } from '../store/actions/story.action'

import { storyService } from '../services/story.service'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { FavoriteBorder, Textsms, LocationOnOutlined, PropaneSharp } from '@mui/icons-material'
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';


export const StoryDetails = (props) => {

    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [color, setColor] = useState('lightblue')

    const [story, setStory] = useState(null)
    const params = useParams()

    // const setShowModal = () => {
    // params.push.history('/gram')
    // console.log(params)
    // }

    const onAddNote = (ev) => {
        // console.log('adding note...', text)
        if (text === '' && text.length < 1) return
        const comment = {
            by: { id: utilService.makeId(), fullname: 'test', imgUrl: '' },
            id: utilService.makeId(),
            likedBy: [{}],
            txt: text,
        }
        story.comments.unshift(comment)
        dispatch(saveStory(story))
        setText('')
        setColor('lightblue')

    }


    const handleChange = (ev) => {
        setText(ev.target.value)
        setColor('#0095F7')

    }


    useEffect(() => {
        storyService.getById((params.id))
            .then((story) => {
                setStory(story)
            })
    }, [])
    if (!story) return <div>Loading...</div>
    const { comments } = story
    return (
        <>

            <div className="details-background" >
                <Link to={'/gram'}>
                    <MdClose className="details-close-button"></MdClose>
                </Link>
                <div className="details-wrapper">
                    <div className="details-inner">
                        <div className="details-content">
                            <div className="left-side-img">
                                <img src={story.imgUrl} alt="" />
                            </div>
                            <div className="chatbox">
                                <div className='chatbox-fixed-header'>
                                    <p className='bold-me'>
                                        <Avatar style={{}}
                                            className="story-avatar-details"
                                            src={story.by.imgUrl}></Avatar>{story.by.fullname}</p>
                                </div>
                                <div className="inner-chat-box">

                                    {comments.map(comment => {
                                        return <div className="individual-comments" key={comment.id}>
                                            <p><span className='bold-me underlineme'>{comment.by.fullname}</span> {comment.txt}</p>
                                            <span className='cursor-helper align-right'><FavoriteBorder style={{ height: '15px', height: '15px', margin: 'auto', top: '50%', position: 'absolute' }} /></span>
                                        </div>
                                    })}
                                </div>
                                <div className="details-comment-section">            {/*CHANGE TO INPUT LATER AND ADD 
                                                                    COMMENT TO EXISTING STORY-ARRAY-COMMENTS */}
                                    <form onSubmit={onAddNote} className='details-input-comments'></form>
                                    <textarea onChange={(e) => handleChange(e)} value={text} required placeholder='Add a comment...' aria-label='Add a comment...' autoComplete='off' autoCorrect='off' name="text" id="text" rows='2' style={{ height: '18px', width: '90%' }} ></textarea>
                                    <button style={{ color: (text)? '#0095F7' : 'lightblue' }} onClick={onAddNote} className='post-comment'>Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}