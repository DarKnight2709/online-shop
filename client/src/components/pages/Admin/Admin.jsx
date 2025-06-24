import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { receiveCurrent } from '../../../features/session/sessionSlice';


const login = async (username, password) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/admin', {
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
      message: result.message
    }

  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: 'Network error. Please try again',
    }
  }
}

function Admin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  // 'success' | 'danger'


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const result = await login(username, password);
    setMessage(result.message);
    setMessageType(result.success ? 'success' : 'danger');

    if (result.success) {
      console.log('Login successful');
      // dispatch(receiveCurrent());
      
      navigate('/admin/home');


    }
  };


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className="col-sm-5 px-3">
      <h2 className="display-6">Admin</h2>
      <form className="row g-3 mt-3" onSubmit={handleSubmit}>

        <div className="col-12">
          <label htmlFor="loginUsername" className="form-label">Username</label>
          <input type="text" className="form-control" id="loginUsername" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="col-12">
          <label htmlFor="loginPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="loginPassword" value={password} onChange={handlePasswordChange} />
        </div>
        {message && (
          <div className={`alert alert-${messageType} text-center`} role="alert">
            {message}
          </div>
        )}
        <div className="col-12 mt-5">
          <button type="submit" className="btn btn-dark text-uppercase rounded-0 px-5">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Admin;
