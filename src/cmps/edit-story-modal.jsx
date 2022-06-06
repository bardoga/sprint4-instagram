import React, { useRef, useEffect, useCallback, useState } from "react"
// import { useDispatch } from "react-redux"
import { MdClose } from 'react-icons/md'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import leftArrow from '../assets/svg/left-arrow.png'

export const EditPostModal = ({ showedit, setShowEditModal, story }) => {
    const detailRef = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch
    const { users, user } = useSelector((storeState) => storeState.userModule)


    useEffect(() => {
        // console.log(detailRef)
        // (detailRef) ? detailRef.scrollIntoView() : ''
        // console.log(user)

        if (showedit) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'scroll'
        }

    }, [showedit])


    const closeDetails = e => {
        if (detailRef.current === e.target) {
            setShowEditModal(false)
        }
    }


    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showedit) {
            }
        },
        [setShowEditModal, showedit]
    )

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress)
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    const scroll = () => {
        detailRef.current.scrollIntoView()
    }


    const onCopyLink = () => {
        console.log(window.location.href)
        const copied = window.location.href
        navigator.clipboard.writeText(copied + `/${story._id}`).then(() => {
            // alert('copied!')
            setShowEditModal(prev => !prev)
        }, () => {
            /* Rejected - clipboard failed */
        });
    }

    const onGotoStory = () => {
        console.log(story._id)
        navigate(`/gram/${story._id}`)
        setShowEditModal(prev => !prev)

    }


    return (
        <>
            {showedit ? (
                <div className="edit-modal-background" ref={detailRef} onClick={closeDetails} onLoad={() => scroll()}>
                    <MdClose onClick={() => setShowEditModal(prev => !prev)} className="modal-close-button"></MdClose>

                    <div className="edit-modal-wrapper" showedit={showedit}>

                        <div className="edit-modal-inner">

                            <div className="edit-modal-content">
                                <div className="nav-box">
                                    {(story.by._id === user._id) ? '' : <button className="btn-helper">Follow</button>}

                                    <button onClick={() => onGotoStory()} className="btn-helper">Go to post</button>
                                    <button onClick={onCopyLink} className="btn-helper">Copy Link</button>
                                    <button onClick={() => setShowEditModal(prev => !prev)} className="btn-helper">Cancel</button>

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