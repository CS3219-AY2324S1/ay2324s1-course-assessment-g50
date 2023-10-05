import "./basicInfo.css";
import Property from "./Property";
import { updateUserBasicInfoAction } from "../../../../reducers/userSlice.js";

const BasicInfo = ({ user }) => {
    return (
        <div className="info-table">
          <h2>Basic Info</h2>
          <Property propertyName="Nickname" propertyValue={user.nickname} dbPropertyName="nickname" apiAction={updateUserBasicInfoAction}/>
          <Property propertyName="Gender" propertyValue={user.gender} dbPropertyName="gender" apiAction={updateUserBasicInfoAction}/>
          <Property propertyName="Date Of Birth" propertyValue={user.birth} dbPropertyName="birth" apiAction={updateUserBasicInfoAction}/>
          <Property propertyName="Sign" propertyValue={user.sign} dbPropertyName="sign" apiAction={updateUserBasicInfoAction}/>
        </div>)
}

export default BasicInfo;