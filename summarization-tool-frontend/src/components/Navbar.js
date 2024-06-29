// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Your Logo
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/register" className="navbar-link">
              Register
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/summary" className="navbar-link">
              Summary
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
