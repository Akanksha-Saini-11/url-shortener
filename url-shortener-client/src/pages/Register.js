import React, { useState } from 'react';
import { registerUser } from '../services/api';
import './Register.css';

const Register = ({ setPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({ name, email, password });
      alert('Registered successfully!');
      setPage('login');
    } catch (err) {
      alert('Error registering. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand">Short<span>Link</span></div>

        <h2 className="auth-card__title">Create an account</h2>
        <p className="auth-card__subtitle">Start shortening your links for free</p>

        <form className="auth-form" onSubmit={handleRegister}>
          <div>
            <label className="auth-form__label">Name</label>
            <input
              className="auth-form__input"
              type="text"
              placeholder="Jane Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="auth-form__label">Email</label>
            <input
              className="auth-form__input"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="auth-form__label">Password</label>
            <input
              className="auth-form__input"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-form__submit" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="auth-card__footer">
          Already have an account?{' '}
          <button onClick={() => setPage('login')}>Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default Register;