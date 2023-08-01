import React from 'react';
import './style.css';
import { PATHS } from './../../router/paths';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <NavLink to={PATHS.HOME}><h1>GSG-API</h1></NavLink>
      <nav>
        <ul>
          <li>
            <NavLink to={PATHS.HOME}>
              {({ isActive, isPending }) => (isActive ? <u>Home</u> : 'Home')}
            </NavLink>
          </li>
          <li>
            <NavLink to={PATHS.STORES.ROOT}>
              {({ isActive, isPending }) => (isActive ? <u>Stores</u> : 'Stores')}
            </NavLink>
          </li>
          <li>
            <NavLink to={PATHS.ABOUT}>
              {({ isActive, isPending }) => (isActive ? <u>About Us</u> : 'About Us')}
            </NavLink>
          </li>
          <li>
            <NavLink to={PATHS.CODEINPUT}>
              {({ isActive, isPending }) => (isActive ? <u>Code Input</u> : 'Code Input')}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
