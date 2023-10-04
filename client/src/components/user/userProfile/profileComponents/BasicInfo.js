import "./basicInfo.css";
import Property from "./Property";

const BasicInfo = ( {user} ) => {
    return (
        <div className="info-table">
          <h2>Basic Info</h2>
          <Property propertyName="Nickname" propertyValue={user.nickname} dbPropertyName="nickname"/>
          <Property propertyName="Gender" propertyValue={user.gender} dbPropertyName="gender"/>
          <Property propertyName="Date Of Birth" propertyValue={user.birth} dbPropertyName="birth"/>
          <Property propertyName="Sign" propertyValue={user.sign} dbPropertyName="sign"/>
        </div>)
}

export default BasicInfo;