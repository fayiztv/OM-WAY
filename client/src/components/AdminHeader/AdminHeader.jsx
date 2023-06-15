import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import "./adminhead.css"


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

    <nav className="navbar">
  <div className="container-fluid">
    <h4>NavBar</h4>
  <button onClick={handleLogout}>Logout</button>
  </div>
</nav>
    
  )
}

export default Adminheader
