import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { getImageUrl } from '../../../utils'
import { Login } from '../Login/Login'

export const Navbar = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [userOpen, setUserOpen] = useState(false)


    const handleBurger = () => {
        setMenuOpen(!menuOpen)
    }
    const handleUser = () => {
        setUserOpen(!userOpen)
    }

    return (
        <nav>

            <img className='burgerBtn' onClick={handleBurger} src={menuOpen
                ? getImageUrl('closeIcon.png')
                : getImageUrl('menuIcon.png')} />


            <div className={`navBtns  ${menuOpen === true}`}>
                <Link to='/' className='navBtn'>
                    <button >Home</button>
                </Link>
                <Link to='/articles' className='navBtn'>
                    <button >Articles</button>
                </Link>
                <Link to='/users' className='navBtn'>
                    <button >Users</button>
                </Link>
            </div>

            <img className='userBtn' onClick={handleUser} src={user.hasOwnProperty('avatar_url')
                ? user.avatar_url
                : getImageUrl('userIcon.png')
            } alt="" />
            {userOpen && <Login/>}


        </nav>
    )
}
