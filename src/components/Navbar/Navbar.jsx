import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { getImageUrl } from '../../../utils'

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleBurger = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav>

            <img className='burgerBtn' onClick={handleBurger} src={menuOpen
                ? getImageUrl('closeIcon.png')
                : getImageUrl('menuIcon.png')} />


            <div className={`navBtns  ${menuOpen===true}`}>
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

            <Link><button>Login</button></Link>


        </nav>
    )
}
