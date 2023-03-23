import React from 'react';
import './NavBar.css'
import { NavLink } from 'react-router-dom';
import Button from '../../shared/FormElements/Button';

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../reducers/authReducer';

const NavBar = () => {
    const authState = useSelector((state => state.auth))
    const dispatch = useDispatch();

    let url = `/mywatchlist/${authState.userId}`

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
    }

    return(
        <nav className='navbar'>
            <h1 className="nav-title">SpaceX</h1>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/pastLaunches">Past Launches</NavLink>
                </li>
                <li>
                    <NavLink to="/api/users">Users</NavLink>
                </li>  
                {!authState.isLoggedIn && (
                    <li>
                        <NavLink to="/auth">Authenticate</NavLink>
                    </li>
                )}  
                {authState.isLoggedIn && (
                    <li>
                        <NavLink to={url}>My Watchlist</NavLink>
                    </li>
                )}  
                {authState.isLoggedIn && (
                    <li>
                        <Button onClick={handleLogout}>Logout</Button>
                    </li>
                )}
                </ul>
        </nav>
    )
}

export default NavBar
