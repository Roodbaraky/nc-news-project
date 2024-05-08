import React from 'react'
import { UserCard } from '../UserCard/UserCard'
import { Link } from 'react-router-dom'

export const Users = ({ users }) => {
    
    return (
        <div> {users.map((user) => { return <Link  key={user.username} to={`/users/${user.username}`}><UserCard  user={user} /></Link> })}</div>
    )
}
