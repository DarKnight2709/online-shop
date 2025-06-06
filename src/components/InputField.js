import {FaEyeSlash,FaEye} from'react-icons/fa';
import { useState } from 'react';
function InputField({type,placeholder,Icon,validate}){
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    if (validate) {
      const errorMsg = validate(val);
      setError(errorMsg);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validate) {
      const errorMsg = validate(value);
      setError(errorMsg);
    }
  };

    return(
        <>
        <div className="input-wrapper">
            {Icon && <i className="left-icon"><Icon /></i>}
            <input
                type={isPassword && showPassword ? 'text' : type}
                placeholder={placeholder} 
                className={`input-field ${error && touched ? 'input-error' : ''}`}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                required 
            />
            {isPassword &&(
                <i className="right-icon toggle-password" onClick={togglePassword}>
                    {showPassword ? <FaEyeSlash/> : <FaEye />}
                </i>
            )}
                {error && touched && <div className="error-text">{error}</div>}

        </div>      
        </>
    )
}
export default InputField;
