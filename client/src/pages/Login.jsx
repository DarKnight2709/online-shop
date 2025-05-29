import React, { useState } from 'react';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password
        })
      });
      const result = await response.json();
      setMessage(result.message);



    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <form action={handleSubmit}>
        <div>
          <label htmlFor="fname" >
            Name:
          </label>
          <input
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="fpassword">
            Password:
            <input
              type="password"
              id="fpassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>
      {message && 
        <h4>{message}</h4>
      }
      
    </div>
  );
}

export default Login;
