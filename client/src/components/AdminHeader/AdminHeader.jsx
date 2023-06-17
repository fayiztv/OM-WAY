import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import "./adminhead.css"
import 'bootstrap/dist/css/bootstrap.css';
import logo from "../../assets/images/logo.png"


function Adminheader() {
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
        await axios.get("/admin/auth/logout")
        dispatch({type:"refresh"})
      }
    })
  }
  return (

    <nav style={{paddingLeft:"20px"}} className="navbar navbar-expand-lg navbar-light bg-light">
        <img src={logo} alt="" />
      <div style={{paddingRight:"20px"}} className="navbar-collapse justify-content-end">
        <button className="btn btn-outline-primary" onClick={handleLogout} type="button">Logout</button>
      </div>
    </nav>
    
  )
}

export default Adminheader
