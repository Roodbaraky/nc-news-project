import React from 'react'
import { Link } from 'react-router-dom'


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
            <Link to='/users'>
                <button>Users</button>
            </Link>

            <button>Login</button>


        </div>
    )
}
