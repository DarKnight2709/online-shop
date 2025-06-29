import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp.");
      setMessageType('danger');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          phone: phone.trim() || null,
          address: address.trim() || null
        })
      });

      const result = await response.json();
      
      setMessage(result.message || 'Đăng ký thành công!');
      setMessageType(response.ok ? 'success' : 'danger');
      if(response.ok) navigate('/login');
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('Đã có lỗi xảy ra. Vui lòng thử lại.');
      setMessageType('danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">
            <i className="bi bi-person-plus-fill me-2"></i>Đăng ký tài khoản
          </h3>

          {message && (
            <div className={`alert alert-${messageType} text-center`} role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fusername" className="form-label">Tên người dùng</label>
              <input
                type="text"
                className="form-control"
                id="fusername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Nhập tên của bạn"
              />
            </div>
            <br />

            <div className="mb-3">
              <label htmlFor="femail" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="femail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Nhập email"
              />
            </div>
            <br />

            <div className="mb-3">
              <label htmlFor="fpassword" className="form-label">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="fpassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Nhập mật khẩu"
              />
            </div>
            <br />

            <div className="mb-3">
              <label htmlFor="fconfpassword" className="form-label">Xác nhận mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="fconfpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Nhập lại mật khẩu"
              />
            </div>
            <br />

            <div className="mb-3">
              <label htmlFor="fphone" className="form-label">Số điện thoại (Không bắt buộc)</label>
              <input
                type="tel"
                className="form-control"
                id="fphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <br />

            <div className="mb-4">
              <label htmlFor="faddress" className="form-label">Địa chỉ (Không bắt buộc)</label>
              <input
                type="text"
                className="form-control"
                id="faddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ của bạn"
              />
            </div>
            <br />

            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang đăng ký...
                  </>
                ) : (
                  'Đăng ký'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
