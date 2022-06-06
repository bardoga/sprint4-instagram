import React, { useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from "@mui/material";
import { useRef } from "react";

export const UserFilter = ({ placeholder, data }) => {

    const [filteredUser, setFilteredUser] = useState([])
    const [wordEntered, setWordEntered] = useState('')
    const ref = useRef()
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                setFilteredUser([])
                setWordEntered('')
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const handleChange = (event) => {
        const userParams = event.target.value
        setWordEntered(userParams)
        const newFilter = data.filter((value) => {
            return value.username.toLowerCase().includes(userParams.toLowerCase())

        })
        if (userParams === '') {
            setFilteredUser([])
        } else {

            setFilteredUser(newFilter)
        }

    }

    const disableBodyScroll = (e) => {
        document.body.style.overflow = 'hidden'
    }
    const enableBodyScroll = (e) => {
        document.body.style.overflow = 'scroll'
    }


    const clearInput = () => {
        setFilteredUser([])
        setWordEntered('')
    }

    const closeFilter = e => {
        // console.log(detailRef.current)
        console.log(e.target)
        // if (detailRef.current !== e.target) {
        //     setFilteredUser([])
        //     setWordEntered('')
        // }
    }


    return (
        <section className="app-header-filter">
            <div className="searchInputs">
                <div className="searchIcons">
                    {(filteredUser.length === 0) && <SearchIcon />}
                    {/* // <SearchIcon color="lightgrey" /> */}
                </div>
                <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleChange} />
                <div className="close-x">
                    {((wordEntered.length > 0) && <CloseIcon fontSize="small" onClick={clearInput} />)}
                    {/* <CloseIcon fontSize="small" /> */}
                </div>
            </div>
            {filteredUser.length !== 0 &&
                < div className="dataResult" onMouseOver={disableBodyScroll} onMouseLeave={enableBodyScroll} ref={ref} onClick={closeFilter}>
                    {filteredUser.slice(0, 4).map((value, key) => {
                        return <div className="dataItem" key={value._id}>
                            <p>
                                <Avatar src={value.imgUrl} style={{ 'maxWidth': '44px', 'maxHeight': '44px', 'margin': '5px', 'position': 'static' }} />
                            </p>
                            <div className="search-bar-username">
                                <p>

                                    {value.username}
                                </p>
                                <p className="unbold-me">
                                    {value.fullname}
                                </p>

                            </div>
                        </div>
                    })}
                </div>
            }
        </section >
    )
}