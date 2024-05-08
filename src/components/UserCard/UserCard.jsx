import React from 'react'
import './UserCard.css'

export const UserCard = ({ user }) => {
    return (
        <div className='user-card-container'>
            <img className='user-img' src={user.avatar_url} alt="" />
            <div className='user-details'>
                <p className='usercard-username'>{user.username}</p>
                <p className='usercard-name'>{user.name}</p>
            </div>
        </div>
    )
}
