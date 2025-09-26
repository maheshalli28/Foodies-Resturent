import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [adminSecret, setAdminSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const user = await login({ email, password });
        navigate(user.role === 'admin' ? '/admin' : '/');
      } else {
        const user = await register({ name, email, password, role, adminSecret: role === 'admin' ? adminSecret : undefined });
        navigate(user.role === 'admin' ? '/admin' : '/');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pt-5" style={{ maxWidth: 480 }}>
      <h4 className="fw-bold mb-3">{mode === 'login' ? 'Sign In' : 'Create Account'}</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        {mode === 'register' && (
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {mode === 'register' && (
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
        {mode === 'register' && role === 'admin' && (
          <div className="mb-3">
            <label className="form-label">Admin Secret</label>
            <input className="form-control" value={adminSecret} onChange={(e) => setAdminSecret(e.target.value)} placeholder="Enter admin secret" required={role === 'admin'} />
            <div className="form-text">Ask admin for the secret. Default: 123456</div>
          </div>
        )}
        <button disabled={loading} className="btn btn-danger text-white w-100" type="submit">
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Register'}
        </button>
      </form>
      <div className="mt-3 text-center">
        {mode === 'login' ? (
          <button className="btn btn-link" onClick={() => setMode('register')}>Create an account</button>
        ) : (
          <button className="btn btn-link" onClick={() => setMode('login')}>Have an account? Sign in</button>
        )}
      </div>
    </div>
  );
}


