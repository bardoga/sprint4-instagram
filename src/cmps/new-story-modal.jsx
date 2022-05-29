import React, { useRef, useEffect, useCallback } from "react"
import { MdClose } from 'react-icons/md'



export const NewStoryModal = ({ showModal, setShowModal }) => {

    const detailRef = useRef()
    const closeDetails = e => {
        if (detailRef.current === e.target) {
            setShowModal(false)
        }
    }


    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false)
            }
        },
        [setShowModal, showModal]
    )

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress)
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );


    return (
        <>
            {showModal ? (
                <div className="modal-background" ref={detailRef} onClick={closeDetails}>
                    <div className="modal-wrapper" showModal={showModal}>
                        <div className="modal-inner">
                            <div className="modal-content">
                                <p>Create new post</p>
                                <h3>Drag photos and videos here</h3>
                                <button className="modal-content-btn2">Select from computer</button>
                                <MdClose onClick={() => setShowModal(prev => !prev)} className="modal-close-button"></MdClose>

                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}