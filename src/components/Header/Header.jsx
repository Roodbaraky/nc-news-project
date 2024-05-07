import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import './Header.css'

export const Header = ({ user, setUser }) => {
  return (

    <Navbar
      user={user}
      setUser={setUser}
    />

  )
}
