import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = ({ icon, title }) => {

    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon} /> <Link to='/'>{title}</Link>
            </h1>
            <ul>
                <li>
                    <Link to="/" className="btn btn-dk">Home</Link>
                </li>
                <li>
                    <Link to="about" className="btn btn-dk">About</Link>
                </li>
            </ul>

        </nav>
    )
};

Navbar.defaultProps = {
    title: ' Github Search',
    icon: 'fab fa-github'
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Navbar