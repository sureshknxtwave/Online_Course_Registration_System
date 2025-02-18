import React,{useState,useEffect} from 'react'

import { Link,useNavigate } from 'react-router-dom'

import axios from 'axios'
import './Login.css'




function Login() {

  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate()

  useEffect(()=> {
    fetchUsers();
  },[])

  const fetchUsers = () =>{
    axios
    .get('http://localhost:3005/register')
    .then((res) => {
      console.log(res.data)
    })
  }

  const handleLogin = async(event) =>{
    event.preventDefault()
    try{
      const response = await axios.post('http://localhost:3005/login',{email,password})
      const token = response.data.token
      const username = response.data.Name
      const userMobile = response.data.Mobile
      const userId = response.data.id

      alert('Login Successful')
      setEmail('')
      setPassword('')
      fetchUsers()
      navigate('/home')
      window.location.reload()
      localStorage.setItem('token',token)
      localStorage.setItem('id',userId)
      localStorage.setItem('username',username)
      localStorage.setItem('userMobile',userMobile)
    }catch(error){
      alert("Invalid User")
      console.log('Login Error')
    }
  }



  return (
    <div className="signup-page  pt-3 " >
      <div className="container">
        <div className="row">
            <div className="col-12  d-flex flex-row justify-content-center  mt-3  ">
              
              <div className="signup-container shadow-lg ">
                  <h1 className="sign-up-heading fade-in">Welcome</h1>
                  <p className="sign-up-dis fade-in">Sign in with your valuable details </p>
                  <form onSubmit={handleLogin}  className="mt-2">
                    
                    <div className="mb-1 mt-2">
                      <label className="sign-up-label fade-in" >Email</label>
                      <div>
                        <input required className="sign-up-input fade-in" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email'/>
                      </div>
                    </div>
                    
                    <div className="mb-1 mt-2">
                      <label className="sign-up-label fade-in" >Password</label>
                      <div>
                        <input  required className="sign-up-input fade-in" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password'/>
                      </div>
                    </div>
                    
                    <div className="mt-5">
                      <button className="signup-btn fade-in" type="submit" value="Signup">LOGIN</button>
                      <p className="sign-up-dis mt-2 fade-in">Don't have an account? <Link style={{"textDecoration":"none"}} to="/register"><span className="sigin-link" >Sign up</span></Link></p>
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
  )
}

export default Login