import React from 'react';

const Profile = ({ user }) => {

  console.log(user);
  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <>
          <p>Nickname: {user.nickname || 'Not provided'}</p>
          <p>Avatar: {user.avatar}</p>
          <p>Gender: {user.gender || 'Not provided'}</p>
          <p>Birth: {user.birth || 'Not provided'}</p>
          <p>Sign: {user.sign || 'Not provided'}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
