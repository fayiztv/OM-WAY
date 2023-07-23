import React from "react";
import {
  RiHome2Fill,
  RiGroupFill,
} from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";
import { IoBagHandleOutline } from 'react-icons/io5';
import { Link } from "react-router-dom";
import "./userbottom.css";
function UserBottom({ page }) {
  return (
    <div className="bottom-nav position-fixed fixed-bottom">
      <div className="bottom-nav-container">
        <div className={`bottom-nav-item ${page === "home" && "active"}`}>
          <Link to="/">
            <RiHome2Fill className="icon" />
            <span>Home</span>
          </Link>
        </div>
        <div className={`bottom-nav-item ${page === "packages" && "active"}`}>
          <Link to="/packages">
            <FaShoppingBag className="icon" />
            <span>Packages</span>
          </Link>
        </div>
        <div className={`bottom-nav-item ${page === "guides" && "active"}`}>
          <Link to="/guides">
            <RiGroupFill className="icon" />
            <span>Guides</span>
          </Link>
        </div>
        <div className={`bottom-nav-item ${page === "bookings" && "active"}`}>
          <Link to="/bookings">
            <IoBagHandleOutline className="icon" />
            <span>Bookings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserBottom;
