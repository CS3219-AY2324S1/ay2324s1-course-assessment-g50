import React from 'react';
import axios from 'axios';

const Deregister = ({ user, onDeregister }) => {
  const handleDeregister = async () => {
    try {
      await axios.delete(`http://localhost:8000/users/${user.id}`);
      onDeregister();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleDeregister}>Deregister</button>
    </div>
  );
};

export default Deregister;
