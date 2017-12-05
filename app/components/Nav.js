import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/fungpredict'>
          Prototype
        </NavLink>
      </li>
      <li>
        <a href="http://fungai.org/" target="_blank">
          Blog
        </a>
      </li>
    </ul>
  )
}