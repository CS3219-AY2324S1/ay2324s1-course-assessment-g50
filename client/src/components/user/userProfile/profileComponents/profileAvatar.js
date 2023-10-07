import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateUserBasicAvatarInfoAction } from '../../../../reducers/userSlice';
import "./profileAvatar.css";

const Avatar = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageLink, setSelectedImageLink] = useState(null);

    const dispatch = useDispatch();

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setSelectedImageLink(file)
        }
    };

    const handleSaveClick = () => {
        const formData = new FormData()
        formData.append('avatar', selectedImageLink)
        dispatch(updateUserBasicAvatarInfoAction(formData))
        setIsEditing(false);
    };

    return (
        <div className="avatar-box">
            <img className="avatar-value" src={selectedImage || user.avatar} alt="User Avatar" />
            {isEditing ? (
                <div>
                    <input className="edit-avatar-value" type="file" accept="image/*" onChange={handleImageChange} />
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            ) : (
                <button onClick={handleEditClick}>Edit</button>
            )}
        </div>
    );
}

export default Avatar;