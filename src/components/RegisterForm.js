import InputField from "./InputField";
import SocialLogin from "./SocialLogin";
import { FaEnvelope, FaLock,FaUser,FaPhone } from 'react-icons/fa';

function RegisterForm({ onBackToLogin }) {
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
    <div className="login-container">
      <h2 className="form-title">Register with</h2>
      <SocialLogin />
        <p className="separator">
            <span>or</span>
        </p>
      <form className="login-form">
        <InputField type="text" placeholder="Full Name" Icon={FaUser} />
        <InputField type="email" placeholder="Email" Icon={FaEnvelope} validate={validateEmail} />
        <InputField type="phone" placeholder="Phone Number" Icon={FaPhone}  />
        <InputField type="password" placeholder="Password" Icon={FaLock} validate={validatePassword} />
        <InputField type="password" placeholder="Confirm Password" Icon={FaLock}/>

        <button className="login-button">Register</button>
      </form>
      <p className="signup-text">
        Already have an account? <a href="#" onClick={onBackToLogin}>Log in</a>
      </p>
    </div>
  );
}
export default RegisterForm;