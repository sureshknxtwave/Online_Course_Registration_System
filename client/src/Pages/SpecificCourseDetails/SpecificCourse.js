// CourseDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SpecificCourse.css'
import {loadStripe} from '@stripe/stripe-js'; 

function SpecificCourse() {
    const courseName = useParams()
    const userId = localStorage.getItem("id");
    
    const [courses, setCourses] = useState([]);
    const [myCourses,setMyCourses] = useState([]);
    
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


 


  const filteredCourses = courses.filter(course => course.courseName === courseName.courseName);
  
  console.log(filteredCourses)

    
  
    // Return null if courseDetails is still being fetched or is empty
    
   // Modify the makePayment function to store purchased course information in the database
const makePayment = async () => {
  try {
    if (filteredCourses.length > 0) {
      const course = filteredCourses[0];
      const price = Number(course.price);
      if (isNaN(price)) {
        throw new Error('Invalid price for the course');
      }
      
      // Make the payment and retrieve the session URL
      const res = await fetch("http://localhost:3005/checkput", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify({
          course: [{
            id: course.id,
            name: course.courseName,
            price: price
          }]
        })
      });

      const data = await res.json();

      // Store the purchased course information in the database
      await axios.post('http://localhost:3005/api/purchased-courses', {
        userId: userId, // Replace userId with the actual user ID
       
        courseName: course.courseName,
        price: price
      });

      // Redirect to the session URL for payment
      window.location = data.url;
    } else {
      console.error('No course found to make payment');
    }
  } catch (error) {
    console.log(error);
  }
}

// Fetch purchased courses for the logged-in user and display them in the "My Courses" section
useEffect(() => {
  const fetchMyCourses = async () => {
    try {
      // Replace userId with the actual user ID
      const response = await axios.get(`http://localhost:3005/api/purchased-courses?userId=${userId}`);
      setMyCourses(response.data);
    } catch (error) {
      console.error('Error fetching purchased courses:', error);
    }
  };
  fetchMyCourses();
}, []);

    


  return (
    <div>
      <div className="specific-course">
        <div className="container">
            <div className="row">
                {filteredCourses.map(course => (
                <div className="col-12 col-md-8">

                    <h1 className="specific-course-hea">{course.courseName}</h1>
                    <h4 className="specific-course-dis">{course.description}</h4>
                    <h6 className="specific-course-bSeller">Best Seller</h6>
                    <h3 className="specific-course-rating">
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star"></span>
                          <span>(3243)</span>
                          <span> 5,245 students</span>
                    </h3>
                    <h4 className="specific-course-lan">English</h4>
                    <h5 className="specific-course-date">Last updated 26/4/2024</h5>
                </div>
  ))}
   {filteredCourses.map(course => (
                <div className="col-12 col-md-4">
                    <div className="specific-course-video-card shadow">
                        <div className=" embed-responsive embed-responsive-16by9">
                            <iframe title="r" className=" specific-course-video embed-responsive-item" src="https://www.youtube.com/embed/ysEN5RaKOlA?rel=0" allowfullscreen></iframe>
                        </div>
                        <div className="specific-course-video-card2">
                        <h1 className='preview'>Preview this course</h1>
                        <hr></hr>
                        <h5 className='preview-price'>₹{course.price}/-<span>₹3,099</span><span className="preview-price-discount">84% off</span></h5>
                        <p className='preview--dis'>2 days left at this price!</p>
                       
                        <div className="text-center">
                            <p className='preview--dis1'>30-Day Money-Back Guarantee</p>
                            <p className='preview--dis1'>Full Lifetime access</p>
                        </div>
                        <div >
                            <button onClick={makePayment} className="spe-btn">Purchase Course</button>
                        </div>
                        </div>
                    </div>

                </div>
    ))}
            </div>

        </div>

      </div>
      <div>
        <div className="container d-none d-lg-block mt-5">
            <div className='row'>
                <h1 className="spe-c-hea-2">What you'll learn</h1>
                <div className="col-12 col-md-6 ">
                  <div >
                    <h4 className="spe-c-dis-2">* Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.</h4>
                    <h4 className="spe-c-dis-2">* After the course you will be able to build ANY website you want.</h4>
                    <h4 className="spe-c-dis-2">* Learn the latest technologies, including Javascript, React, Node and even Web3 development.</h4>
                    <h4 className="spe-c-dis-2">* Work as a freelance web developer.</h4>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SpecificCourse;
