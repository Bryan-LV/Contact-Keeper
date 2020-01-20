import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'

export default function Navbar(props) {
  const {user, isAuthenticated, logoutUser} = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
  }

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a href="" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
            <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </>
  )

  return (
    <nav className="navbar bg-primary">
      <h1 className="">
        <i className={props.icon}/>
        {' '}
        {props.title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon : PropTypes.string
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
}