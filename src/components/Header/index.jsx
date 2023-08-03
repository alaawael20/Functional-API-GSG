import React from 'react';
import './style.css';
import { PATHS } from './../../router/paths';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { ROLES } from '../../constants';

const Header = () => {
  const { role, user, setUser, setToken, setRole } = useAuthContext();
  const handleLogout = () => {
    setUser(null);
    setToken('');
    setRole(ROLES.GUEST);
  };
  return (
    <header className='header'>
      <NavLink to={PATHS.HOME}><h1>GSG-API</h1></NavLink>
      <nav>
        {role === ROLES.GUEST ? (
          <ul>
            <li>
              <NavLink to={PATHS.LOGIN}>
                {({ isActive, isPending }) =>
                  isActive ? <u>Login</u> : 'Login'
                }
              </NavLink>
            </li>
            <li>
              <NavLink to={PATHS.SIGNUP}>
                {({ isActive, isPending }) =>
                  isActive ? <u>Sign up</u> : 'Sign up'
                }
              </NavLink>
            </li>
          </ul>
        ) : (
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
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <h4>Welcome {user?.username}</h4>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Header
