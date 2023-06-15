import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';

function GuideHome() {

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
        await axios.get("/guide/auth/logout")
        dispatch({type:"refresh"})
      }
    })
  }

  return (
    <div>
      <h1>Guide Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  )
}

export default GuideHome