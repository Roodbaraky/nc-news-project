import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from '../Home/Home'

export const Navbar = () => {
    return (
        <div>
            <button>Burger</button>
            <Link to='/'>
                <button>Home</button>
            </Link>
            <Link to='/articles'>
                <button>Articles</button>
            </Link>
            <Link to='/articles'>
                <button>Users</button>
            </Link>

            <button>Login</button>


        </div>
    )
}
