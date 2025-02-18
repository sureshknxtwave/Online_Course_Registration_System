import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  
  const [fullname, setFullname] = useState('');
  
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get('http://localhost:3005/register')
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be more than 8 characters and include at least one uppercase letter, one digit, and one special character.');
      return;
    }

    axios
      .post('http://localhost:3005/register', { fullname, email, mobile, password })
      .then(() => {
        alert('Registration Succesful');

        setFullname('');
        setEmail('');
        setMobile('');
        setPassword('');
        fetchUsers();
        navigate('/login');
      })
      .catch((error) => {
        console.log('Unable to register user:', error);
        alert('Invalid Details or Details Already Exists');
      });
  };

  return (
    <div className="signup-page pt-3">
      <div className="container">
        <div className="row">
          <div className="col-12  d-flex flex-row justify-content-center  mt-3  ">
            <div className="signup-container shadow-lg ">
              <h1 className="sign-up-heading fade-in">Welcome</h1>
              <p className="sign-up-dis fade-in">Sign up with your valuable details </p>
              <form onSubmit={handleRegister} className="mt-4">
                <div className="mb-1">
                  <label className="sign-up-label fade-in">First Name</label>
                  <div>
                    <input required className="sign-up-input fade-in" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder='Enter Your First Name'/>
                  </div>
                </div>
                
                <div className="mb-1 mt-2">
                  <label className="sign-up-label fade-in">Email</label>
                  <div>
                    <input required className="sign-up-input fade-in" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email'/>
                  </div>
                </div>
                <div className="mb-1 mt-2">
                  <label className="sign-up-label fade-in">Mobile No</label>
                  <div>
                    <input required className="sign-up-input fade-in" type="tel" name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Enter Your Mobile Number'/>
                  </div>
                </div>
                <div className="mb-1 mt-2">
                  <label className="sign-up-label fade-in">Password</label>
                  <div>
                    <input required className="sign-up-input fade-in" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password'/>
                  </div>
                </div>
                <div className="mt-5">
                  <button className="signup-btn fade-in" type="submit" value="Signup">SIGNUP</button>
                  <p className="sign-up-dis mt-2 fade-in">Already have an account? <Link style={{"textDecoration":"none"}} to="/login"><span className="sigin-link" >Sign In</span></Link></p>
                </div>
              </form>
            </div>
            <div className=" d-md-block d-none ">
              <img className="signup-img fade-in" src="https://media.istockphoto.com/id/1134001674/photo/university-student-relaxing.jpg?s=612x612&w=0&k=20&c=CFWknNLRd6sk63EGuKQ_uYJBgUc0wYL7P5yQ3EQjvDA=" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
