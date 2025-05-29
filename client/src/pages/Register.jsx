import React, { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPasswrod] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirm: confirmPassword
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
          <label htmlFor="femail" >
            Email:
          </label>
          <input
            type="text"
            id="femail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
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
        <div>
          <label htmlFor="fconfpassword">
            Confirm Password:
            <input
              type="password"
              id="fconfpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPasswrod(e.target.value)}
              required
              placeholder="Enter your confirm password"
            />
          </label>
        </div>

        <button type="submit">Register</button>
      </form>
      {message &&
        <h4>{message}</h4>
      
      }
    </div>
  );
}


export default Register;
