import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

function Header({ onLogout }) {
  const { user } = useContext(AuthContext);

  return (
    <header className="header">
      <h1 className="logo">News Aggregator</h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/newsfeed">News Feed</Link>
        {user ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
