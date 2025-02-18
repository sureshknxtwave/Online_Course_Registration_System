
import Container from 'react-bootstrap/Container';
import Logo from '../../../components/Logo-removebg-preview.png'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



import './UserNav.css'
import React, { useState, useEffect } from 'react';


function NavScrollExample() {
  const [navbar, setNavbar] = useState(false);
  

  const changeBackground = () => {
    if (window.scrollY >= 300) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', changeBackground);

      return () => {
        window.removeEventListener('scroll', changeBackground);
      };
    }
  }, []);
  const navigate = useNavigate();

   const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login')
   }


  return (
    <Navbar expand="lg" className={`${navbar ? 'active fixed-top shadow-lg slide-in-blurred-top ' : 'Navbar fixed-top  '}`}>
      <Container>
        <Navbar.Brand href="#" className="text-white"><img className="logo" src={Logo} alt="" /><span  className={`${navbar ? ' text-primary logo-name  fade-in' : 'logo-name fade-in'}`}>Learn Sphere</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto m-auto my-2 my-lg-0 NavBarLinks"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           <Link style={{"textDecoration":"none"}}>
            <Nav.Link className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`} href="#action1"><i class="fa-solid fa-house"></i>Home</Nav.Link>
           </Link> 
           <Link to="/user/mycourses" style={{"textDecoration":"none"}}>
           <Nav.Link className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`} href="#action2"><i class="fa-solid fa-blog"></i>My Courses</Nav.Link>
           </Link>

           
            <a  href="#blogSection" className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`}><i class="fa-solid fa-blog"></i>Blogs</a>
           
            
            
          
           
           <a href="#feedBack" className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`}><i class="fa-solid fa-blog"></i>Contact Us</a>
           
            <Link to="#footerSection" className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`} ><i class="fa-solid fa-blog"></i>About Us</Link>
           
           
           <Link style={{"textDecoration":"none"}}>
           <Nav.Link className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`} onClick={handleSignOut}><i class="fa-solid fa-blog"></i>Logout</Nav.Link>
           </Link>
            
          </Nav>
          <button className="nav-btn">Get Started</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
