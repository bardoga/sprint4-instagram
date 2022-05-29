// import { utilService } from "../services/utils.service"
import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'javascript-time-ago'
import { FavoriteBorder, Textsms, LocationOnOutlined, PropaneSharp } from '@mui/icons-material'

// English, formatter - English
import en from 'javascript-time-ago/locale/en'  //public library for time display, might be broken, fix later
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


export function StoryPreview({ story }) {

    function goToPost() {
        console.log(story._id)
    }
    return <section className="story-wrapper">
        <div className="story-wrapper-inner">
            <div className="post-username">
                <p>{story.by.fullname}</p>
                <p className='unbold-me'>{story.loc.name}</p>
            </div>
            <div className="additional-comments">
                {/* <p>{(story.comments.length>2)? `View all ${story.comments.length} comments` : ''}</p> */}
            </div>
            <div className="post-img">
                <img style={{ width: 500 }} src={`${story.imgUrl}`} alt="" />
            </div>
            <div className="more-section">
                <span className='cursor-helper'><FavoriteBorder /></span>  {/* onclick should increase like count (check on other browsers)  */}
                <Link to={`/gram/${story._id}`}>

                <span onClick={goToPost} className='cursor-helper' ><Textsms /></span>   {/* on lick should open the details component with comments on the left/chatbox component     */}
                </Link>
                <span className='cursor-helper'><LocationOnOutlined /></span>  {/* atm it won't do anything, will implement posts by location later if have time */}
            </div>
            <div className="asasa">
                <p>{story.likedBy.length} likes</p>
                <p><span className='bold-me underlineme'>{story.by.fullname}</span> {story.txt}</p>
                <p>{(story.comments.length > 2) ? (`View all ${story.comments.length} comments`) : ''}</p>
                <p><span className='bold-me underlineme'>{story.comments[0].by.fullname}</span> {story.comments[0].txt}</p>
                <p className='unbold-me'>{timeAgo.format(story.createdAt)}</p>
            </div>
            <br />
            <div className="preview-comment-section">            {/*CHANGE TO INPUT LATER AND ADD 
                                                                    COMMENT TO EXISTING STORY-ARRAY-COMMENTS */}
                <form className='preview-input-comments'></form>
                {/* <input type="text" name='text' id='text' datatype='preview-text' placeholder='Add a comment...' /> */}
                <textarea placeholder='Add a comment...' aria-label='Add a comment...' autoComplete='off' autoCorrect='off' name="text" id="text" rows='2' style={{ height: '18px' }} ></textarea>
            </div>
        </div>
    </section>
}