// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import App from './App';
import About from './About';
import './nav.css'
import { useAuth0 } from "@auth0/auth0-react";


const AppRouter = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <Router>
      <div className="navv">
        {/* Custom Navbar */}
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="navbar-left">
            {/* Add your login/logout button here */}
            {isAuthenticated ? (
              <>
                <span className='name'> Hello, {user && user.name}</span>
                <button onClick={() => logout()}>Logout</button>
              </>
            ) : (
              <button onClick={() => loginWithRedirect()}>Login</button>
            )}
            
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
