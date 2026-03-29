import React from 'react';
import { logout } from '../utils/auth';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ setPage, currentPage }) => {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    setPage('login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">Short<span>Link</span></div>

      <div className="navbar__nav">
        <button
          className={`nav-link ${currentPage === 'dashboard' ? 'nav-link--active' : ''}`}
          onClick={() => setPage('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-link ${currentPage === 'analytics' ? 'nav-link--active' : ''}`}
          onClick={() => setPage('analytics')}
        >
          Analytics
        </button>
      </div>

      <div className="navbar__right">
        <button className="nav-icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="nav-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;