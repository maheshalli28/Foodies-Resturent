import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('user'); // 'user' | 'admin'
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  // Shared state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const role = activeTab; // role based on tab

      if (mode === 'login') {
        const user = await login({ email, password, role });
        navigate(user.role === 'admin' ? '/admin' : '/');
      } else {
        const user = await register({
          name,
          email,
          password,
          role,
          adminSecret: role === 'admin' ? adminSecret : undefined,
        });
        navigate(user.role === 'admin' ? '/admin' : '/');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='py-5'>
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <div className="card shadow-lg p-4 mb-5 bg-body-tertiary rounded">
        <h4 className="text-center fw-bold mb-3">{mode === 'login' ? 'Sign In' : 'Register'}</h4>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'user' ? 'active' : ''}`}
              onClick={() => setActiveTab('user')}
            >
              User
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              Admin
            </button>
          </li>
        </ul>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit}>
          {/* Name only for registration */}
          {mode === 'register' && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Admin secret only for registration */}
          {mode === 'register' && activeTab === 'admin' && (
            <div className="mb-3">
              <label className="form-label">Admin Secret</label>
              <input
                type="text"
                className="form-control"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                placeholder="Enter admin secret"
                required
              />
              <div className="form-text">Ask admin for the secret. Default: 123456</div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-danger w-100"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
              ? 'Sign In'
              : 'Register'}
          </button>
        </form>

        <div className="mt-3 text-center">
          {mode === 'login' ? (
            <button className="btn btn-link" onClick={() => setMode('register')}>
              Create an account
            </button>
          ) : (
            <button className="btn btn-link" onClick={() => setMode('login')}>
              Have an account? Sign in
            </button>
          )}
        </div>

        {activeTab === 'admin' && mode === 'login' && (
          <p className="text-center text-muted mt-3">
            Admin credentials: <br />
            <span className="text-danger">Email: admin@gmail.com</span> <br />
            <span className="text-danger">Password: 123456</span>
          </p>
        )}
      </div>

      <p className="text-center text-muted mt-2">
        By signing up, you agree to our <a href="#" className="text-decoration-underline text-danger">Terms</a> and <a href="#" className="text-decoration-underline text-danger">Privacy Policy</a>
      </p>
    </div>
    </section>
  );
}
