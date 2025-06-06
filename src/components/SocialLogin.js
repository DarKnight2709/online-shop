import google from '../assets//img/google.png';
import apple from '../assets/img/apple.png';
function SocialLogin() {
  return (
    <>
     <div className="social-login">
            <button className="social-button">
              <img className="social-icon" src={google}  alt="Google"/>
              Google
            </button>
            <button className="social-button">
              <img className="social-icon" src={apple} alt="Apple"/>
              Apple
            </button>
            </div>
    </>
  );
}
export default SocialLogin;