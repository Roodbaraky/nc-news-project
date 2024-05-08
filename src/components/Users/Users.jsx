import React, { useEffect, useState } from 'react'
import { UserCard } from '../UserCard/UserCard'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'


export const Users = ({ users }) => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (users.length) {
            setIsLoading(false)
        }
    }, [users])

    return (
        <>{isLoading
            ?<LoadingSpinner />
            : <div> {users.map((user) => { return <Link key={user.username} to={`/users/${user.username}`}><UserCard user={user} /></Link> })}</div>}</>
    )
}
