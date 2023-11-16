import "./accountInfo.css";
import { useState, useEffect } from "react";
import Property from "./Property";
import { updateUserAccountInfoAction, deregisterUserAction } from "../../../../reducers/userSlice.js";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const AccountInfo = ({ user }) => {
  const [isInvalidUpdate, setIsInvalidUpdate] = useState(false);
  const [isTooShort, setIsTooShort] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.currentUser.status);

  useEffect(() => {
    if (status === "failedAccountInfoUpdate") {
      setIsInvalidUpdate(true);
      setTimeout(() => {
        setIsInvalidUpdate(false);
      }, 3000);
    }
  }, [status]);

  /* sets the loggedIn status to false in userSlice which triggers a logout */
  const handleDelete = () => {
    dispatch(deregisterUserAction());
  }
  return (
    <div className="info-table">
      <h2>Account Info</h2>
      <Property propertyName="Email" propertyValue={user.email} dbPropertyName="email" apiAction={updateUserAccountInfoAction}/>
      <Property propertyName="Password" propertyValue={user.passwordLength} dbPropertyName="password" apiAction={updateUserAccountInfoAction} setIsTooShort={setIsTooShort}/>
      {isInvalidUpdate && <p className="invalid-update">Invalid input provided. Failed to update.</p>}
      {isTooShort && <p className="invalid-password">Password field is empty!</p>}
      <div className="delete-account" onClick={handleDelete}>
        <p>DELETE ACCOUNT</p>
        <MdDeleteForever className="delete-account-icon"/>
      </div>
    </div>)
}

export default AccountInfo;