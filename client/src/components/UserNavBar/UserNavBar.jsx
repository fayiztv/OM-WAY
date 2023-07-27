import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./usernavbar.css";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Complaint from "../../modals/Complaint/Complaint";
import gif from "../../assets/images/direct.gif"
import icon from "../../assets/images/profile.gif"

const UserNavbar = () => {

  const [showModal, setShowModal]= useState(false)

  const user=useSelector((state)=>{
    return state.user.detials
  });
  const dispatch=useDispatch();
  async function handleLogout(e) { 
  e.preventDefault()
  Swal.fire({
    title: 'Are you sure? logout',
    text: "logout from this account!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#7e3af2',
    cancelButtonColor: '##a8a8a8',
    confirmButtonText: 'Yes, Logout!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios.get("/user/auth/logout")
      dispatch({type:"refresh"})
    }
  })
}

  return (
    <div className="div">

    <nav className="user-navbar">
      <div className="logo">
        <Link to="/"><img src={logo} alt="" /></Link>
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
      <div className="profile">
     {/* <Link to={'/chat'}><FaPaperPlane style={{marginRight:'10px',cursor:'pointer',color:'#147E7D'}}/></Link>  */}
     <Link to={'/chat'}><img style={{height:'38px',width:'38px'}} src={gif} alt="" /></Link> 
        <FontAwesomeIcon className="user-icon" icon={faUser} />
        {/* <img className="user-icon" style={{height:'32px',width:'32px'}} src={icon} alt="" /> */}
        <NavDropdown
          
          className="nav-dropdown"
          title={user.name}
          >
          <NavDropdown.Item><Link to={'/chat'}>Messages</Link></NavDropdown.Item>
          <NavDropdown.Item><Link to={'/edit-profile/'+user._id}>Profile</Link></NavDropdown.Item>
          <NavDropdown.Item onClick={()=>{setShowModal(true)}}>Register complaint</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </div>
    </nav>
    {
      showModal &&
      <Complaint setShowModal={setShowModal}/>
    }
    </div>
    
  );
};

export default UserNavbar;
