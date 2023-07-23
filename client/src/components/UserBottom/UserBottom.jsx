import React from "react";
import {
  RiHome2Fill,
  RiMessageFill,
  RiGroupFill,
} from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";
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
        <div className={`bottom-nav-item ${page === "guides" && "active"}`}>
          <Link to="/guides">
            <RiGroupFill className="icon" />
            <span>Guides</span>
          </Link>
        </div>
        <div className={`bottom-nav-item ${page === "packages" && "active"}`}>
          <Link to="/packages">
            <FaShoppingBag className="icon" />
            <span>Packages</span>
          </Link>
        </div>
        <div className={`bottom-nav-item ${page === "profile" && "active"}`}>
          <Link to="/profile">
            <RiMessageFill className="icon" />
            <span>Chat</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserBottom;
