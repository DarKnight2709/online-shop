import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';

const login = async (username, password) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();
    return {
      success: res.ok,
      message: result.message,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // tạo hàm để gửi action

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' | 'danger'
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await login(username, password);

    setMessage(result.message);
    setMessageType(result.success ? 'success' : 'danger');
    setLoading(false);

    if (result.success) {
      console.log('Login successful');
      navigate('/');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </h3>

          {message && (
            <div className={`alert alert-${messageType} text-center`} role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="loginUsername" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="loginUsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="loginPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
              <p className="text-center mt-3">
                Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </p>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
