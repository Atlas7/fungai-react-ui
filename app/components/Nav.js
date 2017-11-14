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
        <NavLink activeClassName='active' to='/helloworld'>
          HelloWorld
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/fungshow'>
          FungShow
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/fungPredict'>
          FungPredict
        </NavLink>
      </li>
    </ul>
  )
}