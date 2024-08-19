import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the user's purchased courses when the component mounts
    const fetchCourses = async () => {
      try {
        // Make a GET request to fetch the user's purchased courses
        const response = await axios.get('/api/my-courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
        <div className="user-details-section">
      <h3 className="user-details-hea">My Courses</h3>
      <ul>
        {courses.map(course => (
          <li key={course._id} className="courselist-box">
                <div className="d-flex flex-row justify-content-between ">
              <span>{course.courseName}</span><span>₹{course.price}/-</span>
              
              
            </div>


            
            </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default MyCourses;
