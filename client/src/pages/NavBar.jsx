import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import '../css/NavBar.css';
const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink exact to="/" activeClassName="active">NEW & FEATURE</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/shop/men" activeClassName="active">MEN</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/shop/women" activeClassName="active">WOMEN</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/shop/sale" activeClassName="active">SALE</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/login" activeClassName="active">LOGIN</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;