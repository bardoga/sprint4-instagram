import React, { useState } from "react"
import { connect } from "react-redux"
import { Link, NavLink } from 'react-router-dom'
import routes from '../routes'
import AddBoxOutlined from '@mui/icons-material/AddBoxOutlined';
import { NewStoryModal } from './new-story-modal'

export const AppHeader = () => {

    const [showModal, setShowModal] = useState(false)

    const onAddPost = () => {
        console.log('adding post..')
        setShowModal(prev => !prev)
    }


    return (
        <header className="app-header">
            <Link to={'/gram'}>
                <div className="app-header-logo">
                    MyGram
                </div>

            </Link>
            <div className="app-header-search">
                <input type="text" placeholder="search" />
            </div>
            <div className="app-header-nav">
                <nav className="app-header-nav">
                    {routes.map(route => <NavLink style={{ paddingLeft: '40px' }} key={route.path} to={route.path}>{route.label}</NavLink>)}

                </nav>
            </div>
            <div>
                <span onClick={onAddPost} className="add-post"><AddBoxOutlined /> </span>
            </div>
            <div>
                <NewStoryModal showModal={showModal} setShowModal={setShowModal} />
            </div>
        </header>
    )
}