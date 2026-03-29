import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import { ThemeProvider } from './context/ThemeContext';
import { getToken, logout } from './utils/auth';
import './styles/global.css';

const isAuthenticated = () => {
  const token = getToken();
  if (!token || token.trim() === '') return false;

  // Decode JWT payload and check expiry
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      logout(); // clear expired token
      return false;
    }
    return true;
  } catch (e) {
    logout(); // clear malformed token
    return false;
  }
};

function App() {
  const [page, setPage] = useState(isAuthenticated() ? 'dashboard' : 'login');

  return (
    <ThemeProvider>
      <div className="app-layout">
        {isAuthenticated() && page !== 'login' && page !== 'register' && (
          <Navbar setPage={setPage} currentPage={page} />
        )}

        <div className="app-content">
          {page === 'login' && <Login setPage={setPage} />}
          {page === 'register' && <Register setPage={setPage} />}
          {page === 'dashboard' && isAuthenticated() && <Dashboard />}
          {page === 'analytics' && isAuthenticated() && <Analytics />}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;