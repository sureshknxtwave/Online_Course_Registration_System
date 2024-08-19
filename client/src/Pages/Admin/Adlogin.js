// AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';

import {useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3005/api/admin/login', { username, password });

      if (response.status === 200) {
        console.log('Admin login successful');
        alert('Login Successful')
        navigate('/admin/home')
        // Redirect or perform actions after successful login
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during admin login:', error);
    }
  };

  return (
    // <div>
    //   <h2>Admin Login</h2>
    //   <form>
    //     <label>
    //       Username:
    //       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //     </label>
    //     <br />
    //     <label>
    //       Password:
    //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </label>
    //     <br />
    //     <button type="button" onClick={handleLogin}>
    //       Login
    //     </button>
    //   </form>
    // </div>


    <div className="signup-page  pt-3 " >
      <div className="container">
        <div className="row">
            <div className="col-12  d-flex flex-row justify-content-center  mt-3  ">
              
              <div className="signup-container shadow-lg ">
                  <h1 className="sign-up-heading fade-in">Welcome Admin</h1>
                  <p className="sign-up-dis fade-in">Sign in with your valuable details </p>
                  <form   className="mt-4">
                    
                    <div className="mb-1 mt-2">
                      <label className="sign-up-label fade-in" >Username</label>
                      <div>
                        <input required className="sign-up-input fade-in" type="text" value={username}   onChange={(e) => setUsername(e.target.value)} placeholder='Enter Your Username'/>
                      </div>
                    </div>
                    
                    <div className="mb-1 mt-2">
                      <label className="sign-up-label fade-in" >Password</label>
                      <div>
                        <input  required className="sign-up-input fade-in" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder ='Enter Your Password' />
                      </div>
                    </div>
                    
                    <div className="mt-5">
                      <button className="signup-btn fade-in" type="button" onClick={handleLogin}>LOGIN</button>
                    </div>  
                  </form>
              </div>
              <div className=" d-md-block d-none ">
                <img className="signup-img fade-in" src="https://thumbs.dreamstime.com/b/vertical-image-happy-asian-male-student-eyeglasses-using-laptop-computer-sitting-bench-park-127892390.jpg" alt="" />
              </div>
              </div>
            
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
