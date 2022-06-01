import React, { useRef, useEffect, useCallback, useState } from "react"
import { MdClose } from 'react-icons/md'
import { uploadService } from "../services/upload.service"
import { ImgUploader } from "./img-uploader"
import { Avatar } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { storyService } from "../services/story.service"
import { saveStory, addStory } from "../store/actions/story.action"
import { utilService } from "../services/utils.service"
import leftArrow from '../assets/svg/left-arrow.png'



export const NewStoryModal = ({ showModal, setShowModal }) => {
    const guestUserPhoto = 'http://cdn.onlinewebfonts.com/svg/img_258083.png'

    const [text, setText] = useState(null)
    const [color, setColor] = useState('lightblue')
    const [words,setWords] = useState(0)
    const [img, setImg] = useState('')
    const { user } = useSelector((storeState) => storeState.userModule)
    const dispatch = useDispatch()

    const detailRef = useRef()
    const closeDetails = e => {
        if (detailRef.current === e.target) {
            setImg('')
            setShowModal(false)
            setText('')
        }
    }


    const handleChange = (ev) => {
        setText(ev.target.value)
    }


    const onAddStory = (ev) => {
        console.log(text, img, user)
        if (text === '' && text.length < 1) return
        const story = {
            // _id: utilService.makeId(),
            txt: text,
            imgUrl: img.imgUrl, //Can be an array if decide to support multiple imgs
            createdAt: Date.now(),
            by: {
                _id: (user) ? user._id : 'guest_id',
                fullname: (user) ? user.fullname : 'guest',
                imgUrl: (user) ? user.imgUrl : guestUserPhoto
            },
            loc: {
                lat: '',
                lng: '',
                name: ''
            },
            comments: [],
            likedBy: [],
            tags: ['fun']

        }
        dispatch(addStory(story))
        setShowModal(false)
        // console.log(ans)
    }

    const onUploaded = (imgUrl) => {
        setImg({ imgUrl })
    }

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setImg('')
                setText('')
            }
        },
        [setShowModal, showModal]
    )



    useEffect(
        () => {
            document.addEventListener('keydown', keyPress)
            setImg('')
            setText('')
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );
    const checkLoggedUser = () => {
        if (user) return user.imgUrl
        else return
    }

    return (
        <>
            {/* if (!img) return <div>Loading</div> */}
            {showModal ? (
                <div className="modal-background" ref={detailRef} onClick={closeDetails}>
                    <MdClose onClick={() => setShowModal(prev => !prev)} className="modal-close-button"></MdClose>
                    <div className="modal-wrapper" showModal={showModal}>
                        <div className="modal-inner">
                            <div className="modal-content">
                                <div className="modal-contant-header">
                                    {img && <button onClick={() => setImg('')} className="previous-modal-content"> <img src={leftArrow} width={15} height={15} alt=""/></button>}
                                    <h1>Create new post</h1>
                                    {img && <button onClick={onAddStory} className="share-button">Share</button>}
                                </div>
                                <div className="modal-content-body">
                                    {img && <section className="adadada">

                                        <img src={img.imgUrl} alt="" />
                                        <div className="new-story-txt-box">
                                            <Avatar style={{ 'maxWidth': '26px', 'maxHeight': '26px', 'marginLeft': '3px' }} src={checkLoggedUser()} />
                                            <textarea onChange={(e) => handleChange(e)} value={text} type="text" name="txt" id="mame" placeholder="Write a caption" />

                                        </div>
                                    </section>
                                    }
                                    {!img &&
                                        <div>
                                            <div className="conditional-hide">
                                                <div>
                                                    <h3>Drag photos and videos here</h3>
                                                </div>
                                                <div>
                                                    <button className="modal-content-btn2">Select from computer</button>
                                                </div>
                                                <div>
                                                    <ImgUploader onUploaded={onUploaded} />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ) : null
            }
        </>
    )
}