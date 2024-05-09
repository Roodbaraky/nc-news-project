import React, { useEffect, useState } from 'react'
import { UserCard } from './UserCard'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from './LoadingSpinner'


export const Users = ({ users }) => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (users.length) {
            setIsLoading(false)
        }
    }, [users])

    return (
        <>
  {isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-wrap justify-center gap-4 mt-32">
      {users.map((user) => (
        <Link key={user.username} to={`/users/${user.username}`}>
          <div className="user-card-container bg-bkg-1/90 rounded-lg shadow-md p-4 flex items-center">
            <img className="user-img w-16 h-16 rounded-full mr-4" src={user.avatar_url} alt="" />
            <div>
              <p className="text-content font-bold">{user.username}</p>
              <p className="text-content">{user.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )}
</>
    )
}
