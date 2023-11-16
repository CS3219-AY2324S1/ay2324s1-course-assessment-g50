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
        if (file.type.startsWith('image/')) {
            setSelectedImage(URL.createObjectURL(file));
            setSelectedImageLink(file);
        } else {
            // Handle the case when the selected file is not an image
            alert('Please select a valid image file.');
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
                <div className="avatar-after-edit">
                    <label htmlFor="upload" className="avatar-upload">
                        Select Image
                        <input id="upload" className="avatar-upload-button" type="file" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <p className="avatar-save" onClick={handleSaveClick}>Save</p>
                </div>
            ) : (
                <p className="avatar-edit" onClick={handleEditClick}>Edit</p>
            )}
        </div>
    );
}

export default Avatar;