import axios from 'axios';
import React from 'react'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';

function GuideHeader() {
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

  // const guide = useSelector((state) => {
  //   return state.guide.detials;
  // });
  return (
    <div className="overlap">
      <div className="group">
      <ul className="nav-links">
          <li>
            <Link to="/guide">Profile</Link>
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
      <div className="overlap-wrapper">
          <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}

export default GuideHeader;
