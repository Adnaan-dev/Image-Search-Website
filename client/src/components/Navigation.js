import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="main-navigation">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🖼️</span>
          <span className="logo-text">Image Search</span>
        </Link>

        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <span className="nav-icon">🔍</span>
            Search
          </Link>
          <Link 
            to="/top-searches" 
            className={`nav-link ${isActive('/top-searches') ? 'active' : ''}`}
          >
            <span className="nav-icon">🔥</span>
            Top Searches
          </Link>
          <Link 
            to="/history" 
            className={`nav-link ${isActive('/history') ? 'active' : ''}`}
          >
            <span className="nav-icon">📜</span>
            My History
          </Link>
        </div>

        <div className="nav-user">
          <div className="user-info">
            {user.avatar && (
              <img src={user.avatar} alt={user.displayName} className="user-avatar" />
            )}
            <span className="user-name">{user.displayName || user.username}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

