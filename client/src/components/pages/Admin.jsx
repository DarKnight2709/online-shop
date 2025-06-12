import React, { useState } from 'react';


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
    if(res.ok) {
      return true;
    } else {
      return false;
    }
  } catch(err) {
    console.log(err);
  }
}

function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginSuccess = await login(username, password);

    if(loginSuccess) {
      alert('success');
      console.log('Login successful');

    } else {
      alert('please check the your credentials again');
    }
  };


  const handleUsernameChange = (e) => {
      setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  }

  return(    
        <div className="col-sm-5 px-3">
            <h2 className="display-6">Admin</h2>                    
            <form className="row g-3 mt-3" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="loginUsername" className="form-label">Username</label>
                    <input type="text" className="form-control" id="loginUsername" value={username} onChange={handleUsernameChange}/>
                </div>
                <div className="col-12">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="loginPassword" value={password} onChange={handlePasswordChange}/>
                </div>
                <div className="col-12 mt-5">
                    <button type="submit" className="btn btn-dark text-uppercase rounded-0 px-5">Login</button>
                </div>
            </form>
        </div>        
    )
}

export default Admin;
