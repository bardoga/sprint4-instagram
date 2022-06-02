import React from "react"
import { useRef } from "react"
import { useSelector } from "react-redux"
import { userService } from "../services/user.service"
import { useNavigate } from 'react-router-dom';

export const UserModal = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const navigate = useNavigate()

    const onSignOut = () => {
        console.log(navigate)
        userService.logout()
        navigate('/')



    }

    return (

        <div className="user-modal-container" >

            <div className="user-modal-triangle">
            </div >
            <div className="user-modal-inner">
                <div className="user-modal-content">
                    <div className="cnt1" style={{ cursor: 'pointer' }} onClick={() => onSignOut()}>
                        <p >Switch Accounts</p>
                    </div>
                    <div className="cnt2">
                        {user ? <p>Log Out</p> : <p>Log In</p>}

                    </div>
                </div>
            </div>

        </div>
    )
}
