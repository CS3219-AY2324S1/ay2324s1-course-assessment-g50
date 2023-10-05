import React, { useState, useEffect } from 'react';
import "./register.css";
import { useSelector, useDispatch } from 'react-redux';
import { resetStatus } from "../../../reducers/userSlice";

const Register = ({ handleRegister }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isNotMatchingPassword, setIsNotMatchingPassword] = useState(false);  
  const [isSucessfulRegistration, setIsSucessfulRegistration] = useState(false); 
  const status = useSelector((state) => state.currentUser.status);

  /* verifies that passwords are matching before registering */
  const onClickRegister = async () => {
    setIsNotMatchingPassword(false);
    if (password !== confirmPassword) {
      setIsNotMatchingPassword(true);
    } else {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      await handleRegister(email, password);
    }
  }

  /* If API is sucessful */
  useEffect(() => {
    if (status === "sucessfulRegistration") {
      setIsSucessfulRegistration(true);
      setTimeout(() => {
        dispatch(resetStatus());
      }, 3000);
    } else {
      setIsSucessfulRegistration(false);
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

        {isSucessfulRegistration && <p className="successful-registration-message">Sucessful registration, you may log in now</p>}
        {isNotMatchingPassword && <p className="error-message">Your passwords are not matching</p>}
        <div className="button" onClick={onClickRegister}>Register</div>
        
    </div>
  );
};

export default Register;
