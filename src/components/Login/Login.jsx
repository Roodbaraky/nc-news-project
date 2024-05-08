import React, { useEffect, useState } from 'react'
import { getUser, getUsers } from '../../../APIs'
import './Login.css'
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
    }else{
      alert('Please enter a valid username (& password)')
    }

  }
  return (
    <form className='login-form' action="">
      <label>Username: <input type="text" /></label>
      <label>Password: <input type="password" /></label>
      <button onClick={handleClick}>Log in</button>
    </form>
  )
}
