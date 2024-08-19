
import Container from 'react-bootstrap/Container';
import Logo from '../../../components/Logo-removebg-preview.png'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'


import './AdNav.css'
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

  return (
    <Navbar expand="lg" className={`${navbar ? 'active fixed-top shadow-lg slide-in-blurred-top ' : 'Navbar fixed-top  '}`}>
      <Container>
        <Navbar.Brand href="#" className="text-white"><img className="logo" src={Logo} alt="" /><span className="logo-name">Learn Sphere</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto m-auto my-2 my-lg-0 NavBarLinks"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           <Link style={{"textDecoration":"none"}} to="/admin/home">
            <Nav.Link className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`} href="#action1"><i class="fa-solid fa-house"></i>Home</Nav.Link>
           </Link> 
           <Link style={{"textDecoration":"none"}} to='/admin/users'>
           <Nav.Link className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`} href="#action2"><i class="fa-solid fa-blog"></i>Students</Nav.Link>
           </Link>
           <Link style={{"textDecoration":"none"}} to='/admin/add/users'>
           <Nav.Link className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`} href="#action2"><i class="fa-solid fa-blog"></i>Add Students</Nav.Link>
           </Link>
           <Link style={{"textDecoration":"none"}} to='/admin/courses'>
           <Nav.Link className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`} href="#action2"><i class="fa-solid fa-blog"></i>Courses</Nav.Link>
           </Link>
           <Link style={{"textDecoration":"none"}} to='/admin/add/courses'>
           <Nav.Link className={`${navbar ? 'navLinkScroll fade-in' : 'navLink fade-in'}`} href="#action2"><i class="fa-solid fa-blog"></i>Add Courses</Nav.Link>
           </Link>
           
            
            
          </Nav>
          <button className="nav-btn">Get Started</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
