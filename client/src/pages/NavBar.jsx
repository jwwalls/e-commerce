import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../App.css';
import '../css/NavBar.css';

const NavBar = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId ) {
      setUserId(storedUserId);
   
    }
  }, [userId]);

  const handleCartClick = () => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
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
          <Link to={`/cart/${userId}`} onClick={handleCartClick}>CART</Link>
        </li>
        <li className="nav-item">
          {userId ? (
             <NavLink to="/login">{userId}</NavLink>
          ) : (
            <NavLink to="/login">LOGIN</NavLink>
          )}
          
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;