import React from 'react'
import './UserCard.css'

export const UserCard = ({ user }) => {
    return (
        <div className='user-card-container'>
            <img className='user-img' src={user.avatar_url} alt="" />
            <div className='user-details'>
                <p className='user-username'>{user.username}</p>
                <p className='user-name'>{user.name}</p>
            </div>
        </div>
    )
}
