import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../../../APIs'
import './User.css'
export const User = () => {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const { username } = useParams()
    useEffect(() => {
        getUser(username)
            .then((user) => {
                setUserProfile(user)
            })
            .catch((err) => {
                setError(err)
                navigate(`/error`)
            })
    }, [username])
    return (

        <div className='user-profile-container'>
            <p className='user-username'>{userProfile.username}</p>
            <p className='user-name'>{userProfile.name}</p>
            <img className='user-profile-img' src={userProfile.avatar_url} alt="" />
            
        </div>
    )
}
