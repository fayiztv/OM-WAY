import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSideBar from '../AdminSideBar/AdminSideBar';
// import "./adminhome.css"

function AdminComplaints() {
  return (
   <div className="container-scroller">
      <AdminHeader/>
        <div style={{display:'flex'}} className="container-fluid page-body-wrapper">
            <AdminSideBar/>
          <div className="main-panel">
            <div  className="content-wrapper">
              <h2>Complaints</h2>
            <div style={{width:'1000px',marginTop:'30px'}} className="col-lg-6 grid-margin stretch-card">
                <div style={{paddingBottom:'20px'}} className="table-responsive">



                </div>
               </div>
            </div>
          </div>
        </div>
   </div>
  )
}

export default AdminComplaints