// components/CourseList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseDetails.css'

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch all courses when the component mounts
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      // Send a DELETE request to the server to delete the course
      await axios.delete(`http://localhost:3005/api/courses/${courseId}`);
      // Filter out the deleted course from the state
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="user-details-section">
      <h2 className="user-details-hea">Course List</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id} className="courselist-box">
            <div className="d-flex flex-row justify-content-between ">
              <span>{course.courseName}</span><span>₹{course.price}/-</span>
              <button className="userdetails-btn btn btn-outline-danger " onClick={() => handleDeleteCourse(course._id)}>Delete</button>
              
            </div>
            
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
