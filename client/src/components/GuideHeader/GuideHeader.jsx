import axios from 'axios';
import React from 'react'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NavDropdown from 'react-bootstrap/NavDropdown';

function GuideHeader() {

  const guide=useSelector((state)=>{
    return state.guide.detials

  });
  const dispatch = useDispatch();
  async function handleLogout(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure? logout",
      text: "logout from this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7e3af2",
      cancelButtonColor: "##a8a8a8",
      confirmButtonText: "Yes, Logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.get("/guide/auth/logout");
        dispatch({ type: "refresh" });
      }
    });
  }
  return (
    <div className="overlap">
      <div className="group">
      <ul className="nav-links">
          <li>
            <Link to="/guide">Dashboard</Link>
          </li>
          <li>
            <Link to="/guide/packages">Packages</Link>
          </li>
          <li>
            <Link to="/guide/bookings">Bookings</Link>
          </li>
          <li>
            <Link to="/guide/reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <div className="profile">
          <FontAwesomeIcon className="user-icon" icon={faUser} />
        <NavDropdown
          className="nav-dropdown"
          title={guide.firstName}
          >
          <NavDropdown.Item><Link to='/guide/profile'>Profile</Link></NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </div>
    </div>
  );
}

export default GuideHeader;
