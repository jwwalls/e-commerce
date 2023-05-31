// NavBar.js
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../App.css';
import '../css/NavBar.css';

const NavBar = ({ user }) => {
  const [userId, setUserId] = useState('');
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [userId]);

  const handleCartClick = () => {
    if (userId) {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    } else {
      setUserId('1');
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact to="/">NEW & FEATURE</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/shop/men">MEN</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/shop/women">WOMEN</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/shop/sale">SALE</NavLink>
        </li>
        <li className="nav-item">
          {showLoginMessage ? (
            <span>Please login</span>
          ) : (
            <Link to={`/cart/${userId}`} onClick={handleCartClick}>
              CHECKOUT
            </Link>
          )}
        </li>
        <li className="nav-item">
          {user ? (
            <NavLink to="/login">{user.username}</NavLink>
          ) : (
            <NavLink to="/login">LOGIN</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
