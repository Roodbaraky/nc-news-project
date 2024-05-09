import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../utils/utils'
import { Login } from './Login'

export const Navbar = ({ user, setUser, users, setError }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [userOpen, setUserOpen] = useState(false)


    const handleBurger = () => {
        setMenuOpen(!menuOpen)
    }
    const handleUser = () => {
        setUserOpen(!userOpen)
    }
    const clickHandler = () => {
        if (menuOpen) {
            setMenuOpen(false)
        }
    }

    return (
        <nav className="flex-row p-2 m-1">
            <section className="flex justify-between items-center px-4 py-2 text-4xl">
                <img
                    className="burgerBtn block md:hidden h-14 w-auto cursor-pointer"
                    onClick={handleBurger}
                    src={menuOpen ? getImageUrl('closeIcon.png') : getImageUrl('menuIcon.png')}
                    alt="Menu"
                />

                <div onClick={clickHandler} className={`navBtns sm:flex sm:items-evenly sm:self-center sm:ms-auto sm:me-auto ${menuOpen ? ' absolute  top-24  left-0 shadow-lg flex flex-col  items-center bg-accent-1/90  rounded-xl  mx-2 z-10 text-3xl ' : 'hidden'}`}>
                    <Link to="/" className="navBtn">
                        <button className=" hover:bg-gray-700 px-5 py-2 rounded ">Home</button>
                    </Link>
                    <Link to="/articles" className="navBtn">
                        <button className=" hover:bg-gray-700 px-5 py-2 rounded ">Articles</button>
                    </Link>
                    <Link to="/users" className="navBtn">
                        <button className=" hover:bg-gray-700 px-5 py-2 rounded ">Users</button>
                    </Link>
                </div>

                <img
                    className="userBtn h-14 w-auto cursor-pointer rounded-full"
                    onClick={handleUser}
                    src={user.hasOwnProperty('avatar_url') ? user.avatar_url : getImageUrl('userIcon.png')}
                    alt="User"
                />
            </section>

            {userOpen && (
                <Login
                    setUser={setUser}
                    setUserOpen={setUserOpen}
                    users={users}
                    setError={setError}
                />
            )}
        </nav>
    )
}
