import React, { useEffect, useState } from 'react'
import { getUser, getUsers } from '../utils/APIs'
import { useNavigate } from 'react-router-dom'

export const Login = ({ setUser, setUserOpen, users, setError }) => {
  const navigate = useNavigate()


  const handleClick = (e) => {
    e.preventDefault()
    const enteredUser = e.target.parentElement[0].value
    if (users.map((user) => user.username).includes(enteredUser)) {
      getUser(enteredUser)
        .then((user) => {
          if (user) {
            setUser(user)
            e.target.parentElement[0].value = ''
            e.target.parentElement[1].value = ''
            setUserOpen(false)
          }
        })
        .catch((err) => {
          setError(err)
          navigate(`/error`)
        })
    } else {
      alert('Please enter a valid username (& password)')
    }

  }
  return (
    <form className="login-form bg-bkg-1/90 px-4 py-6 rounded-lg shadow-md" action="">
      <label className="block text-content mb-2">Username:
        <input type="text" defaultValue='jessjelly' className="form-input mt-1 block w-full rounded-md bg-bkg border border-gray-300 focus:border-accent-1 focus:ring focus:ring-accent-1" />
      </label>
      <label className="block text-content mb-2">Password:
        <input type="password" className="form-input mt-1 block w-full rounded-md bg-bkg border border-gray-300 focus:border-accent-1 focus:ring focus:ring-accent-1" />
      </label>
      <button className="bg-accent-1 text-content hover:bg-accent-2 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-1" onClick={handleClick}>
        Log in
      </button>
    </form>
  )
}
