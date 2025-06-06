import { useState } from 'react';
import InputField from './components/InputField';
import SocialLogin from './components/SocialLogin';
import RegisterForm from './components/RegisterForm';
import { FaEnvelope,FaLock } from 'react-icons/fa';
function App() {
  const [showRegister, setShowRegister] = useState(false);
  const validateEmail = (value) => {
  if (!value) return "Email is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Invalid email format.";
};
const validatePassword = (value) => {
  if (!value) return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return "";
};
  return (
    <div>
      {!showRegister ? (
        <div className="login-container">
          <h2 className="form-title">Log in with</h2>
          <SocialLogin />
          <p className="separator">
            <span>or</span>
          </p>
          <form action="#" className="login-form">
            <InputField type="email" placeholder="Email" Icon={FaEnvelope} validate={validateEmail}/>
            <InputField type="password" placeholder="Password" Icon={FaLock} validate={validatePassword} />
            <a href="#" className="forgot-pass-link">Forgot password?</a>
            <button className="login-button">Log In</button>
          </form>
          <p className="signup-text">
            Don't have an account? <a href="#" onClick={() => setShowRegister(true)}>Register</a>
          </p>
        </div>
      ) : (
        <RegisterForm onBackToLogin={() => setShowRegister(false)} />
      )}
    </div>
  );
}

export default App;