import React from 'react';
import { Link } from 'react-router-dom';
import './usernavbar.css'
import image from "../../assets/images/face1.jpg"
import logo from "../../assets/images/logo.png"

const UserNavbar = () => {
  return (
    <nav className="user-navbar">
      <div className='logo'>
      <img src={logo} alt="" />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/guides">Guides</Link>
        </li>
        <li>
          <Link to="/packages">Packages</Link>
        </li>
        <li>
          <Link to="/bookings">Bookings</Link>
        </li>
      </ul>
      </div>
      <div className="profile-logo">
        <img src={image} alt="Profile" />
      </div> 
    </nav>
  );
};

export default UserNavbar;
