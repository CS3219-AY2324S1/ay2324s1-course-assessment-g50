import React, { useState } from 'react';

const UpdateProfile = ({ user, onUpdate}) => {
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [sign, setSign] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      ...(nickname && { nickname }),
      ...(birth && { birth }),
      ...(sign && { sign }),
      ...(gender && { gender }),
    };
    try {
      onUpdate(updateData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nickname">Nickname</label>
      <input
        type="text"
        id="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <br />
      <label htmlFor="birth">Birthday</label>
      <input
        type="date"
        id="birth"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
      />
      <br />
      <label htmlFor="sign">Sign</label>
      <input
        type="text"
        id="sign"
        value={sign}
        onChange={(e) => setSign(e.target.value)}
      />
      <br />
      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <br />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfile;
