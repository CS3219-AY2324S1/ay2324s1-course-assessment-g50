import "./property.css"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


const Property = ({ propertyName, propertyValue, dbPropertyName, apiAction, setIsTooShort }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const status = useSelector((state) => state.currentUser.status);

  /* Encryption of the password */
  useEffect(() => {
    let value = dbPropertyName !== "password" ? propertyValue : "*".repeat(propertyValue);
    setCurrentValue(value);
  }, [status])

  const dispatch = useDispatch();

  const handleEditClick = () => {
    //clears the password 
    if (dbPropertyName === "password") {
      setCurrentValue("");
    }
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleSaveClick = () => {
    if (dbPropertyName === "password" && currentValue.length === 0) {
      setIsTooShort(true);
      setTimeout(() => {
        setIsTooShort(false);
      }, 3000);
    } else {
      const user = { [dbPropertyName]: currentValue };
      setIsEditing(false);
      dispatch(apiAction(user));
    }
  };

  return (
    <div className="property-field">
      <p className="property-name">{propertyName}</p>
      {isEditing 
      ? <input className="edit-property-value" type={dbPropertyName !== "password" ? "text" : "password"} value={currentValue} onChange={handleInputChange}/>
       : <p className="property-value" type={dbPropertyName !== "password" ? "text" : "password"} >{currentValue}</p>}
      {isEditing 
      ? <p className="save-button" onClick={handleSaveClick}>Save</p>
      : <p className="edit-button" onClick={handleEditClick}>Edit</p>}
    </div>)
}

export default Property;