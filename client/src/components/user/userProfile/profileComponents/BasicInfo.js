import "./basicInfo.css";
import { useState, useEffect } from "react";
import Property from "./Property";
import { updateUserBasicInfoAction } from "../../../../reducers/userSlice.js";
import { useSelector } from "react-redux";

const BasicInfo = ({ user }) => {
  const [isInvalidUpdate, setIsInvalidUpdate] = useState(false);
  const status = useSelector((state) => state.currentUser.status);

  useEffect(() => {
    if (status === "givenInvalidInfoUpdate") {
      setIsInvalidUpdate(true);
      setTimeout(() => {
        setIsInvalidUpdate(false);
      }, 3000);
    }
  }, [status]);

  return (
      <div className="info-table">
        <h2>Basic Info</h2>
        <Property propertyName="Nickname" propertyValue={user.nickname} dbPropertyName="nickname" apiAction={updateUserBasicInfoAction}/>
        <Property propertyName="Gender" propertyValue={user.gender} dbPropertyName="gender" apiAction={updateUserBasicInfoAction}/>
        <Property propertyName="Date Of Birth" propertyValue={user.birth} dbPropertyName="birth" apiAction={updateUserBasicInfoAction}/>
        <Property propertyName="Sign" propertyValue={user.sign} dbPropertyName="sign" apiAction={updateUserBasicInfoAction}/>
        {isInvalidUpdate && <p className="invalid-update">Invalid input provided. Failed to update.</p>}
      </div>)
}

export default BasicInfo;