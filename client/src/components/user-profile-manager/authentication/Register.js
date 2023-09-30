import React, { useState, useEffect } from 'react';
import "./register.css";
import { useSelector } from 'react-redux';

const Register = ({ handleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isNotMatchingPassword, setIsNotMatchingPassword] = useState(false);  
  const [isSucessfulRegistration, setIsSucessfulRegistration] = useState(false); 
  const status = useSelector((state) => state.loggedInUser.register);

  /* verifies that passwords are matching before registering */
  const onClickRegister = async () => {
    if (password !== confirmPassword) {
      setIsNotMatchingPassword(true);
    } else {
      await handleRegister(email, password);
    }
  }

  useEffect(() => {
    if (status === "sucessfulRegistration") {
      setIsSucessfulRegistration(true);
    }
  }, [status]);

  return (
    <div className="registration-container">
      <div className="email">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="password">
        <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="confirm-password">
        <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {isSucessfulRegistration && <p className="sucessful-registration-message">Sucessful registration, you may log in now</p>}
        {isNotMatchingPassword && <p className="error-message">Your passwords are not matching</p>}
        <div className="button" onClick={onClickRegister}>Register</div>
        
    </div>
  );
};

export default Register;
