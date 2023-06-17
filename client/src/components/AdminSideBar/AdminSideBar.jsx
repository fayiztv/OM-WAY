import React from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faRegistered, faExclamationTriangle, faUser } from '@fortawesome/free-solid-svg-icons';


function AdminSideBar() {
  return (
<div className="sidebar">
<ul className="sidebar-nav">
  <li className="sidebar-item">
    <Link to="/admin/dashboard" className="sidebar-link">
      <FontAwesomeIcon icon={faChartBar} className="sidebar-icon" />
      Dashboard
    </Link>
  </li>
  <li className="sidebar-item">
    <Link to="/admin/users" className="sidebar-link">
      <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
      Customers
    </Link>
  </li>
  <li className="sidebar-item">
    <Link to='/admin/guides' className="sidebar-link">
      <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
      Guides
    </Link>
  </li>
  <li className="sidebar-item">
    <Link to="/admin/registrations" className="sidebar-link">
      <FontAwesomeIcon icon={faRegistered} className="sidebar-icon" />
      Registrations
    </Link>
  </li>
  <li className="sidebar-item">
    <Link to="/admin/complaints" className="sidebar-link">
      <FontAwesomeIcon icon={faExclamationTriangle} className="sidebar-icon" />
      Complaints
    </Link>
  </li>
</ul>
</div>
  )
}

export default AdminSideBar