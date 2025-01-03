import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
                <a href="/" className="brand-logo">Link Shortener</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink href="/create">Create</NavLink></li>
                    <li><NavLink href="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}
