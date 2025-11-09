import { useState } from 'react';

const LoginForm = ({ onLogin, loading }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <div className="logo-icon">W</div>
          <h1>Warehouse Management</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Signing In…' : 'Sign In'}
          </button>
          <p className="login-hint">Demo credentials: admin / admin</p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
