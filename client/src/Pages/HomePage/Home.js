import React from 'react';
import './Home.css';
import PersonalPlanImg from '../../components/personalplan.png';

function Home() {
  return(
    <div >
      <div >
      <div className="home-card">
         <img src="https://lizza.wpengine.com/lms/wp-content/uploads/sites/12/2024/02/AdobeStock_587433154-1.webp" alt="" />
         <div className="home-card-card">
           <p className="home-card-card-hea1">INDEPENDENT INSTITUTION</p>
           <h1 className="home-card-card-hea2">Top Notch Education & Research </h1>
          <p className="home-card-card-dis mt-4">“Unlock the door to your future: Enroll in a course today and turn your aspirations into achievements.”</p>
           <div className="mt-5">
             <button className='home-card-card-btn1'>Try It Now</button>
             <button className='home-card-card-btn2'>Watch Demo</button>
           </div>
         </div>
         <img src="https://lizza.wpengine.com/lms/wp-content/uploads/sites/12/2024/02/AdobeStock_545875468@2x-1.webp" alt="" />
       </div>

       <div className="personal-plan-section">
         <div className="container">
           <div className="row">
             <div className="col-12 col-md-5">
               <div className="pps-card">
                <h6 className="personal-plan-section-hea1">Personal Plan</h6>
                <h1 className="personal-plan-section-hea2">Take Your Career to the next level</h1>
                <p className="personal-plan-section-dis">Go further at work and in life with access to a collection of top-rated courses in tech, business, and more.</p>
                <div>
                  <button className="personal-plan-section-btn">Start Learning</button>
                </div>
               </div>
             </div>
             <div className="col-12 col-md-6">
               <img className="PersonalPlanImg" src={PersonalPlanImg} alt="" />
             </div>
           </div>
         </div>
       </div>  

      <div className="ratings-cards">
        <div className='container'>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="rat-cards">
                <h1>11000+</h1>
                <h6>on-demand courses</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="rat-cards">
                <h1>8000+</h1>
                <h6>practice exercises</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="rat-cards">
                <h1>4.4 </h1>
                <h6>average course rating</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="rat-cards">
                <h1>4000+</h1>
                <h6>top instructors</h6>
              </div>
            </div>
          </div>

        </div>


      </div>

      <div className="trending-now-section">
        
        <div className="container">
          <div className="row">
          <h1 className="tns-hea">Trending Now</h1>
          <hr/>
            <div className="col-6 col-md-3">
              <h1 className="tns-hea2">ChatGPT is a top skill</h1>
              <p className="tns-link">See ChatGPT Courses</p>
              <p className="tns-learners"> 28956 learners</p>
              <div>
                <button className="tns-btn">Show all trending courses</button>
              </div>

            </div>
            <div className="col-6 col-md-3">
              <h1 className="tns-sec-name">Development</h1>
              <h4 className="tns-link">Python</h4>
              <h6 className="tns-learners">4435 learners</h6>
              <h4 className="tns-link">Web development</h4>
              <h6 className="tns-learners">2335 learners</h6>
              <h4 className="tns-link">Data Science</h4>
              <h6 className="tns-learners">4495 learners</h6>
            </div>
            <div className="col-6 col-md-3">
            <h1 className="tns-sec-name">Design</h1>
              <h4 className="tns-link">Blender</h4>
              <h6 className="tns-learners">4435 learners</h6>
              <h4 className="tns-link">Graphic Design</h4>
              <h6 className="tns-learners">2335 learners</h6>
              <h4 className="tns-link">User Experience Design</h4>
              <h6 className="tns-learners">4495 learners</h6>

            </div>
            <div className="col-6 col-md-3">
            <h1 className="tns-sec-name">Business</h1>
              <h4 className="tns-link">PMI Project Management Professional(PMP)</h4>
              <h6 className="tns-learners">4435 learners</h6>
              <h4 className="tns-link">Microsoft Power BI</h4>
              <h6 className="tns-learners">2335 learners</h6>
              <h4 className="tns-link">Project Management</h4>
              <h6 className="tns-learners">4495 learners</h6>

            </div>

          </div>

        </div>
      </div>

      </div>

    </div>
  )
}
      
export default Home;
