import "./property.css"
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

const Property = ({ propertyName, propertyValue, dbPropertyName, apiAction }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    let value = dbPropertyName !== "password" ? propertyValue : "*".repeat(propertyValue);
    setCurrentValue(value);
  }, [propertyValue])

  const dispatch = useDispatch();

  const handleEditClick = () => {
    if (dbPropertyName === "password") {
      setCurrentValue("");
    }
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleSaveClick = () => {
    const user = { [dbPropertyName]:currentValue };
    dispatch(apiAction(user));
    setIsEditing(false);
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