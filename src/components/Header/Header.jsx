import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import './Header.css'

export const Header = ({user}) => {
  return (

    <Navbar  user={user}/>

  )
}
