import "./property.css"
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateUserInfoAction } from "../../../../reducers/userSlice.js";

const Property = ({ propertyName, propertyValue, dbPropertyName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    setCurrentValue(propertyValue);
  }, [propertyValue])

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleSaveClick = () => {
    const user = {};
    user[dbPropertyName] = currentValue;
    dispatch(updateUserInfoAction(user));
    setIsEditing(false);
  };

  return (
    <div className="property-field">
      <p className="property-name">{propertyName}</p>
      {isEditing 
      ? <input className="edit-property-value" type="text" value={currentValue} onChange={handleInputChange}/>
       : <p className="property-value">{currentValue}</p>}
      {isEditing 
      ? <p className="save-button" onClick={handleSaveClick}>Save</p>
      : <p className="edit-button" onClick={handleEditClick}>Edit</p>}
    </div>)
}

export default Property;