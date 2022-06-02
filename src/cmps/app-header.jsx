import React, { useState, useRef } from "react"
import { UserModal } from "./user-modal"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink } from 'react-router-dom'
import routes from '../routes'
import { NewStoryModal } from './new-story-modal'
import send from '../assets/svg/send.png'
import more from '../assets/svg/more.png'
import direction from '../assets/svg/direction.png'
import heart from '../assets/svg/heart.png'
import { Avatar } from "@mui/material"
const guestUserPhoto = 'http://cdn.onlinewebfonts.com/svg/img_258083.png'

export const AppHeader = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const [showModal, setShowModal] = useState(false)
    const [openMenu, setopenMenu] = useState(false)


    const onAddPost = () => {
        console.log('adding post..')
        setShowModal(prev => !prev)
    }
  
    return (
        <header className="app-header">
            <Link to={'/gram'} style={{ textDecoration: 'none' }}>
                <div className="app-header-logo">
                    MyGram
                </div>

            </Link>
            <div className="app-header-search">
                <input type="text" placeholder="Search" />
            </div>
            <div className="app-header-nav">
                <nav className="app-header-nav">
                    {routes.map(route => <NavLink style={{ paddingLeft: '40px' }} key={route.path} to={route.path}>{route.label}</NavLink>)}
                    <img className="navbar-icons" src={send} width={24} height={24} alt="" />
                    <img onClick={onAddPost} className="navbar-icons" src={more} width={24} height={24} alt="" />
                    <img className="navbar-icons" src={direction} width={24} height={24} alt="" />
                    <img className="navbar-icons" src={heart} width={24} height={24} alt="" />
                    <Avatar onClick={() => setopenMenu(prev => !prev)} style={{ 'maxWidth': '27px', 'maxHeight': '27px', 'marginLeft': '10px', 'cursor': 'pointer' }} src={(user) ? user.imgUrl : guestUserPhoto} />
                    {openMenu && <UserModal/>}
                </nav>
            </div>
            <div>
                <NewStoryModal showModal={showModal} setShowModal={setShowModal} />
            </div>
        </header>
    )
}
