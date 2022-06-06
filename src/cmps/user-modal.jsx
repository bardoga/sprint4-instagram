import React from "react"
import { useSelector } from "react-redux"
import { userService } from "../services/user.service"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export const UserModal = (props) => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const navigate = useNavigate()

    const onSignOut = () => {
        // console.log(navigate)
        userService.logout()
        navigate('/')
    }

    const onLogIn = () => {
        navigate('/')
    }


    const onHandleProfile = () => {
        console.log(user)
        const { username } = user
        console.log(navigate)
        // const newu = userService.getById(user).then(() => {
        // console.log(newu)
        navigate(`${user._id}`)
        // })
    }
    return (

        <div className="user-modal-container" >

            <div className="user-modal-triangle">
            </div >
            <div className="user-modal-inner">
                <div className="user-modal-content">
                    {
                        <Link to={`/${user._id}`}>
                            <div className="cnt0 div-border active-helper">
                                <p onClick={onHandleProfile}>Profile</p>
                            </div> </Link>}
                    <div className='cnt1 div-border active-helper' onClick={() => onSignOut()}>
                        <p >Switch Accounts</p>
                    </div>
                    <div className="cnt2 div-border active-helper">
                        {user && <p onClick={onSignOut}>Log Out</p>}
                        {!user && <p onClick={onLogIn}>Log In</p>}

                    </div>

                </div>
            </div>

        </div>
    )
}
