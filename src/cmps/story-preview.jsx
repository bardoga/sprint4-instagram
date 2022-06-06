import React, { useEffect, useState, Component } from 'react'
import { utilService } from "../services/utils.service"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loadStorys, saveStory } from '../store/actions/story.action'
import { getActionUpdateStory } from '../store/actions/story.action'
import { loadUsers } from '../store/actions/user.action'
import { userService } from '../services/user.service'
import { EditPostModal } from './edit-story-modal.jsx'


import { Avatar } from "@mui/material"
import heart from '../assets/svg/heart2.png'
import heartFilled from '../assets/svg/heartFilled.png'
import send from '../assets/svg/send.png'
import chat from '../assets/svg/chat-bubble.png'
import edit from '../assets/svg/edit.svg'
import saveEmpty from '../assets/svg/ribbon-hollow.png'
import saveFilled from '../assets/svg/ribbon-filled.png'

// English, formatter - English
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'  //public library for time display, might be broken, fix later
// import { userService } from '../services/user.service'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


export function StoryPreview({ story }) {
    const dispatch = useDispatch()
    const { user, users } = useSelector((storeState) => storeState.userModule)
    const [text, setText] = useState('')
    const [color, setColor] = useState('lightblue')
    const [save, setSave] = useState(saveEmpty)
    const [saved, setSaved] = useState(saveFilled)
    const [showedit, setShowEditModal] = useState(false)
    const [loggedUser, setLoggedUSer] = useState((userService.getLoggedinUser()) ? userService.getLoggedinUser() : 'guest')
    const guestUserPhoto = 'http://cdn.onlinewebfonts.com/svg/img_258083.png'


    useEffect(() => {
        // dispatch(loadStorys())
        document.body.style.overflow = 'scroll'
        // console.log(loggedUser)
    }, [story, users])

    useEffect(() => {
        console.log('storys and users updated')
        dispatch(loadStorys())
        dispatch(loadUsers())
    }, [])


    const onSavePost = () => {
        if (!loggedUser) {
            return
        }
        const { savedStoryIds } = loggedUser
        if (savedStoryIds.includes(story._id)) {
            console.log(savedStoryIds)
            const idx = savedStoryIds.findIndex(savedStoryId => savedStoryId === story._id)
            console.log(idx)
            savedStoryIds.splice(idx, 1)
            console.log(loggedUser)
            userService.update(loggedUser)
            dispatch(loadStorys())
        }
        else {
            savedStoryIds.push(story._id)
            userService.update(loggedUser)
            dispatch(loadStorys())
        }
    }

    const onLikePost = () => {
        if (!loggedUser) {
            return
        }
        const { likedBy } = story
        // debugger
        console.log('liked by', likedBy)
        let obj = likedBy.findIndex(x => x._id === user._id)
        console.log(obj)
        if (obj !== -1) {

            likedBy.splice(obj, 1)
            dispatch(saveStory(story))
        }

        else {
            let liked = {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl
            }
            likedBy.push(liked)
            dispatch(saveStory(story))
        }
    }


    const onAddComment = (ev) => {
        if (text === '' && text.length < 1) return
        const comment = {
            by: { id: utilService.makeId(), fullname: (user) ? user.username : 'Guest', imgUrl: (user) ? user.imgUrl : guestUserPhoto },
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



    const { savedStoryIds } = loggedUser
    const { likedBy } = story
    if (!story) return <div>Loaidng...</div>
    return <section className="story-wrapper" >
        <div>
            <EditPostModal showedit={showedit} setShowEditModal={setShowEditModal} story={story} />
        </div>
        <div className="story-wrapper-inner">
            <div className="post-username">
                <div className='preview-header-leftside'>

                    <div className="story-avatar" style={{ height: '42px', width: '42px' }}>
                        <Avatar style={{ 'maxWidth': '32px', 'maxHeight': '32px', 'margin': '5px', 'position': 'static' }}
                            className="story-avatar"
                            // src={story.by.imgUrl}></Avatar>
                            src={guestUserPhoto}></Avatar>

                    </div>
                    <div className="story-header-username">
                        <p>{story.by.fullname}</p>
                        <p className='unbold-me'>{story.loc.name}</p>
                    </div>
                </div>
                <div className="div-header-edit">
                    <img onClick={() => setShowEditModal(prev => !prev)} src={edit} alt="" width={24} height={24} />
                </div>
            </div>
            <div className="post-img">
                <img style={{ width: 470 }} src={`${story.imgUrl}`} alt="" />
            </div>
            <div className="more-section-parent">
                <div className="more-section">
                    <span onClick={onLikePost} className='cursor-helper more-section-hovereffect'> <img src={((likedBy.find(o => o._id === user._id)) ? heartFilled : heart)} width={24} height={24} alt="" /></span>  {/* onclick should increase like count (check on other browsers)  */}
                    <Link to={`/gram/${story._id}`} style={{ textDecoration: 'none' }}>

                        <span className='cursor-helper more-section-hovereffect' ><img src={chat} width={24} height={24} alt="" /></span>   {/* on lick should open the details component with comments on the left/chatbox component     */}
                    </Link>
                    <span className='cursor-helper more-section-hovereffect'> <img src={send} width={24} height={24} alt="" /></span>  {/* atm it won't do anything, will implement posts by location later if have time */}
                </div>
                <div className="more-section-save more-section-hovereffect">
                    <span onClick={onSavePost}> <img src={((savedStoryIds.includes(story._id)) ? saveFilled : saveEmpty)} alt="" width={22} height={22} /></span>
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
                {story.comments.by && <p><span className='bold-me underlineme'>{story.comments[0].by.username}</span> {story.comments[0].txt}</p>
                }            <p className='unbold-me'>{timeAgo.format(story.createdAt)}</p>
            </div>
            <br />
            <div className="preview-comment-section">            {/*CHANGE TO INPUT LATER AND ADD 
                                                                    COMMENT TO EXISTING STORY-ARRAY-COMMENTS */}
                <form onSubmit={onAddComment} className='preview-input-comments'></form>
                {/* <input type="text" name='text' id='text' datatype='preview-text' placeholder='Add a comment...' /> */}
                <textarea onChange={(e) => handleChange(e)} name='txt' value={text} placeholder='Add a comment...' aria-label='Add a comment...' autoComplete='off' autoCorrect='off' id="text" rows='2' style={{ height: '18px' }} ></textarea>
                <button style={{ color: (text) ? '#0095F7' : 'lightblue' }} onClick={onAddComment} className='post-comment'>Post</button>
            </div>
            {/* <div>
                <EditPostModal showedit={showedit} setShowEditModal={setShowEditModal} story={story} />
            </div> */}
        </div>
    </section >
}