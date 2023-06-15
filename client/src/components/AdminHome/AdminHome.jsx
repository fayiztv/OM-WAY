import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import AdminFooter from '../AdminFooter/AdminFooter';

function AdminHome() {

    

  return (
   <div className="container-scroller">
      <AdminHeader/>
        <div style={{display:'flex'}} className="container-fluid page-body-wrapper">
            <AdminSideBar/>
          <div className="main-panel">
            <div  className="content-wrapper">
            <div style={{width:'1000px',marginTop:'30px'}} className="col-lg-6 grid-margin stretch-card">
                <div style={{paddingBottom:'20px'}} className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Product</th>
                        <th>Sale</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jacob</td>
                        <td>Photoshop</td>
                        <td className="text-danger"> 28.76% <i className="mdi mdi-arrow-down"></i></td>
                        <td><label className="badge badge-danger">Pending</label></td>
                      </tr>
                      <tr>
                        <td>Messsy</td>
                        <td>Flash</td>
                        <td className="text-danger"> 21.06% <i className="mdi mdi-arrow-down"></i></td>
                        <td><label className="badge badge-warning">In progress</label></td>
                      </tr>
                      <tr>
                        <td>John</td>
                        <td>Premier</td>
                        <td className="text-danger"> 35.00% <i className="mdi mdi-arrow-down"></i></td>
                        <td><label className="badge badge-info">Fixed</label></td>
                      </tr>
                      <tr>
                        <td>Peter</td>
                        <td>After effects</td>
                        <td className="text-success"> 82.00% <i className="mdi mdi-arrow-up"></i></td>
                        <td><label className="badge badge-success">Completed</label></td>
                      </tr>
                      <tr>
                        <td>Dave</td>
                        <td>53275535</td>
                        <td className="text-success"> 98.05% <i className="mdi mdi-arrow-up"></i></td>
                        <td><label className="badge badge-warning">In progress</label></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
          </div>
            </div>
            <AdminFooter/>
          </div>
        </div>
      </div>
  )
}

export default AdminHome