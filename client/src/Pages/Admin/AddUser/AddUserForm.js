// components/AddUserForm.js

import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3005/api/admin/add-user', formData);
      alert('User added successfully');
      // Optionally, clear form fields after submission
      setFormData({
        fullname: '',
        email: '',
        mobile: '',
        password: ''
      });
    } catch (err) {
      console.error('Error adding user:', err);
      alert('Failed to add user. Please try again.');
      // Handle error: display error message, etc.
    }
  };

  return (
    <div className="feedback-container ">
      <form onSubmit={handleSubmit}>
      <h1 className='add-courses-heading'>Add Users</h1>
      <div className="mb-3 mt-2">
      <label className="add-c-label fade-in" >Full Name :</label>
        <input className="add-c-input fade-in" type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" required />
        </div>
      
      <div className="mb-3 mt-2">

      <label className="add-c-label fade-in" >Email :</label>
        <input className="add-c-input fade-in" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        </div>
      
      
      
      <div className="mb-3 mt-2">
      <label className="add-c-label fade-in" >Mobile :</label>
      
      <input className="add-c-input fade-in" type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required />
      </div>
        
        
      <div className="mb-3 mt-2">
      <label className="add-c-label fade-in" >Password :</label>
        
        <input className="add-c-input fade-in" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        
        </div>
        <div className=" mt-4">
        <button className="signup-btn" type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
