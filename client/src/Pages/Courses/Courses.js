import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import './Courses.css';

function Courses() {
  const [courseDetails, setCourseDetails] = useState([]);

  const fetchCourseDetails = async (courseName) => {
    try {
      const response = await axios.get(`http://localhost:3005/api/courses/${courseName}`);
      setCourseDetails(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch web development courses by default when component mounts
    fetchCourseDetails('Web Development');
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleButtonClick = (courseName) => {
    // Reset courseDetails to hide currently displayed courses
    setCourseDetails([]);
    // Fetch details for the clicked course
    fetchCourseDetails(courseName);
  };

  return (
    <div>
      <div className="course-section">
        <div className="text-center">
          <h1 className='course-section-hea'>All the skills you need in one place</h1>
          <p className='course-section-dis'>From critical skills to technical topics, Learn Sphere your professional development.</p>
        </div>
        <div className="c-s-btn-card">
          <button style={{"backgroundColor":"#41C9E2","color":"white"}} onClick={() => handleButtonClick('Web Development')}>Web Development</button>
          <button onClick={() => handleButtonClick('JavaScript')}>JavaScript</button>
          <button onClick={() => handleButtonClick('Angular')}>Angular</button>
          <button onClick={() => handleButtonClick('Java')}>Java</button>
          <button onClick={() => handleButtonClick('Python')}>Python</button>
        </div>

        {courseDetails.length > 0 && (
          <div className="course-card-container">
            <div className="container">
              <div className="row">
                {courseDetails.map(course => (
                  <div className="col-12 col-md-4" key={course._id}>
                    <div className="course-card shadow">
                      <div>
                        <img src={course.imageUrl} alt="" />
                      </div>
                      <div className="p-3">
                        <h1 className="cc-cName">{course.courseName}</h1>
                        <h6 className="cc-cDis">{course.description}</h6>
                        <h4 className="cc-cRating">
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star"></span>
                          <span>(3243)</span>
                        </h4>
                        <h6 className="cc-cDuration">{course.duration} months</h6>
                        <h5 className="cc-cPrice">{course.price}/-</h5>
                        <h6 className="cc-cBSeller">Best Seller</h6>
                        <div>
                          <Link to={{
                            pathname: `/courses/${course.courseName}`,
                           
                          }} ><button className="cc-btn">See Details</button></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
