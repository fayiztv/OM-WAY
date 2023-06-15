import React from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom';


function AdminSideBar() {
  return (
    <nav className="sidebar sidebar-offcanvas" style={{width:'400px'}} id="sidebar">
    <ul className="nav">
      <li className='nav-item'>
        <Link style={{padding:'20px'}} className="nav-link" to="/admin/">
          <span className="menu-title">Dashboard</span>
          <i className="mdi mdi-home menu-icon"></i>
        </Link>
        <Link style={{padding:'20px'}} className="nav-link" to="/admin/guides">
          <span className="menu-title">Guides</span>
          <i className="mdi mdi-home menu-icon"></i>
        </Link>
        <Link style={{padding:'20px'}} className="nav-link" to="/admin/users">
          <span className="menu-title">Users</span>
          <i className="mdi mdi-home menu-icon"></i>
        </Link>
        <Link style={{padding:'20px'}} className="nav-link" to="/admin/registrations">
          <span className="menu-title">Registrations</span>
          <i className="mdi mdi-home menu-icon"></i>
        </Link>
        <Link style={{padding:'20px'}} className="nav-link" to="/admin/complaints">
          <span className="menu-title">Complaints</span>
          <i className="mdi mdi-home menu-icon"></i>
        </Link>
      </li>
    </ul>
  </nav>
  )
}

export default AdminSideBar