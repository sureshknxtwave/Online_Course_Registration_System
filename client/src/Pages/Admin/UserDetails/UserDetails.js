// Client-Side: React Component (UserDetails.js)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserData.css'
const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3005/api/users/${userId}`);
      // Refresh user list after deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-details-section">
      <h2 className="user-details-hea">User Details</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="userdetails_box">
            <span>{user.fullname}</span><span>{user.email}</span><span>{user.mobile}</span>
            <button className="userdetails-btn btn btn-outline-danger " onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
