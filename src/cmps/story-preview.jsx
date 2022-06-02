import { utilService } from "../services/utils.service"
import React, { useEffect, useState, Component } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loadStorys, saveStory } from '../store/actions/story.action'


import { Avatar } from "@mui/material"
import heart from '../assets/svg/heart2.png'
import send from '../assets/svg/send.png'
import chat from '../assets/svg/chat-bubble.png'
import save from '../assets/svg/save.svg'

// English, formatter - English
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'  //public library for time display, might be broken, fix later
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


export function StoryPreview({ story }) {
    const dispatch = useDispatch()
    const { user } = useSelector((storeState) => storeState.userModule)
    const [text, setText] = useState('')
    const [color, setColor] = useState('lightblue')
    const guestUserPhoto = 'http://cdn.onlinewebfonts.com/svg/img_258083.png'


    const onAddNote = (ev) => {
        console.log(user)
        if (text === '' && text.length < 1) return
        const comment = {
            by: { id: utilService.makeId(), fullname: (user) ? user.name : 'Guest', imgUrl: (user) ? user.imgUrl : guestUserPhoto },
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

    return <section className="story-wrapper" >
        <div className="story-wrapper-inner">
            <div className="post-username">
                <div className="story-avatar" style={{ height: '42px', width: '42px' }}>
                    <Avatar style={{ 'maxWidth': '32px', 'maxHeight': '32px', 'margin': '5px', 'position': 'static' }}
                        className="story-avatar"
                        src={story.by.imgUrl}></Avatar>
                </div>
                <p>{story.by.fullname}</p>
                <p className='unbold-me'>{story.loc.name}</p>
            </div>
            <div className="post-img">
                <img style={{ width: 470 }} src={`${story.imgUrl}`} alt="" />
            </div>
            <div className="more-section-parent">
                <div className="more-section">
                    <span className='cursor-helper'> <img src={heart} width={24} height={24} alt="" /></span>  {/* onclick should increase like count (check on other browsers)  */}
                    <Link to={`/gram/${story._id}`} style={{ textDecoration: 'none' }}>

                        <span className='cursor-helper' ><img src={chat} width={24} height={24} alt="" /></span>   {/* on lick should open the details component with comments on the left/chatbox component     */}
                    </Link>
                    <span className='cursor-helper'> <img src={send} width={24} height={24} alt="" /></span>  {/* atm it won't do anything, will implement posts by location later if have time */}
                </div>
                <div className="more-section-save">
                    <span> <img src={save} alt="" width={22} height={22} backgroundColor={'black'} /></span>
                </div>

            </div>
            <div className="asasa">
                <p>{story.likedBy.length} likes</p>
                <p><span className='bold-me underlineme'>{story.by.fullname}</span> {story.txt}</p>
                <Link to={`/gram/${story._id}`} style={{
                    textDecoration: 'none', fontSize: "smaller",
                    letterSpacing: "0.2px", textDecoration: "none", color: "#8e8e8e"
                }}>

                    <p className="more-comments-section">{(story.comments.length > 2) ? (`View all ${story.comments.length} comments`) : ''}</p>
                </Link>
                {story.comments.by && <p><span className='bold-me underlineme'>{story.comments[0].by.fullname}</span> {story.comments[0].txt}</p>
                }            <p className='unbold-me'>{timeAgo.format(story.createdAt)}</p>
            </div>
            <br />
            <div className="preview-comment-section">            {/*CHANGE TO INPUT LATER AND ADD 
                                                                    COMMENT TO EXISTING STORY-ARRAY-COMMENTS */}
                <form onSubmit={onAddNote} className='preview-input-comments'></form>
                {/* <input type="text" name='text' id='text' datatype='preview-text' placeholder='Add a comment...' /> */}
                <textarea onChange={(e) => handleChange(e)} name='txt' value={text} placeholder='Add a comment...' aria-label='Add a comment...' autoComplete='off' autoCorrect='off' id="text" rows='2' style={{ height: '18px' }} ></textarea>
                <button style={{ color: (text) ? '#0095F7' : 'lightblue' }} onClick={onAddNote} className='post-comment'>Post</button>
            </div>
        </div>
    </section >
}