// components/AddCourseForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './AddCourses.css'

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    duration: '',
    imageUrl: '',
    price: 0,
    // Add more state fields as needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3005/api/add/courses', formData);
      console.log('Course registered:', res.data);
      alert("Course Added Succesfully")
      // Optionally, redirect or show a success message
    } catch (err) {
      console.error('Error registering course:', err);
      // Handle error: display error message, etc.
    }
  };

  return (
    <div className="feedback-container ">
    <form onSubmit={handleSubmit}>
      <h1 className='add-courses-heading'>Add Courses</h1>
      <div className="mb-3 mt-2">
      <label className="add-c-label fade-in" >Course Name :</label>
      <input className="add-c-input fade-in" type="text" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Course Name" required />
      </div>
      
      <div className="mb-3 mt-2">

      <label className="add-c-label fade-in" >Description :</label>
      <input className="add-c-input fade-in" type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      </div>
      <div className="mb-3 mt-2">
      <label className="add-c-label fade-in" >Duration :</label>
      <input className="add-c-input fade-in" type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" required />

      </div>
      <div className="mb-3 mt-2">
          
      <label className="add-c-label fade-in" >ImageURL :</label>
      <input className="add-c-input fade-in" type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
      </div>
      
      <div className="mb-3 mt-2">
      <label className="add-c-label fade-in" >Price :</label>
      <input className="add-c-input fade-in" type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      </div>
      {/* Add more input fields for additional course details */}
      <button className="signup-btn" type="submit">Register Course</button>
    </form>
    </div>
  );
};

export default AddCourseForm;
