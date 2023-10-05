import "./accountInfo.css";
import Property from "./Property";
import { updateUserAccountInfoAction, deregisterUserAction } from "../../../../reducers/userSlice.js";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const AccountInfo = ({ user }) => {
  const dispatch = useDispatch();

  /* sets the loggedIn status to false in userSlice which triggers a logout */
  const handleDelete = () => {
    dispatch(deregisterUserAction());
  }
  return (
    <div className="info-table">
      <h2>Basic Info</h2>
      <Property propertyName="Email" propertyValue={user.email} dbPropertyName="email" apiAction={updateUserAccountInfoAction}/>
      <Property propertyName="Password" propertyValue={user.passwordLength} dbPropertyName="password" apiAction={updateUserAccountInfoAction}/>
      <div className="delete-account" onClick={handleDelete}>
        <p>DELETE ACCOUNT</p>
        <MdDeleteForever className="delete-account-icon"/>
      </div>
      
    </div>)
}

export default AccountInfo;