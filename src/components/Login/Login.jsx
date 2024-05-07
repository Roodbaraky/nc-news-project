import React from 'react'
import { getUser } from '../../../APIs'
import './Login.css'

export const Login = ({ setUser, setUserOpen }) => {

  const handleClick = (e) => {
    e.preventDefault()
    getUser(e.target.parentElement[0].value)
      .then((user) => {
        if (user) {
          setUser(user)
          e.target.parentElement[0].value = ''
          e.target.parentElement[1].value = ''
          setUserOpen(false)
        }
      })
      .catch(() => {
        e.target.parentElement[0].value = 'user not found'
      })

  }
  return (
    <section className='login-section' action="">
      <label>Username: <input type="text" /></label>
      <label>Password: <input type="password" /></label>
      <button onClick={handleClick}>Log in</button>
    </section>
  )
}
