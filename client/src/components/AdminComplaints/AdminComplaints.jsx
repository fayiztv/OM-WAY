import axios from "axios";
import React, { useState } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import "../AdminRegistrations/registraions.css";

function AdminRegistrations() {
  const [complaints, setComplaints] = useState([""]);
  const [refresh, setRefresh] = useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/admin/complaints");
     
        if (!data.err) {
          setComplaints(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);

  return (
    <div className="container-scroller">
      <AdminHeader />
      <div
        style={{ display: "flex" }}
        className="container-fluid page-body-wrapper"
      >
        <AdminSideBar />
        <div className="main-panel">
          <div className="content-wrapper">
            <h2>Complaints</h2>
            <div
              style={{ width: "70vw" }}
              className="col-lg-6 grid-margin stretch-card"
            >
              <div
                style={{ paddingBottom: "20px" }}
                className="table-responsive"
              >
                <table className="table table-hover mt-5">
                  <thead className="thead-dark">
                    <tr className="table-head">
                      <th scope="col">SI No</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Guide Email</th>
                      <th scope="col">Description</th>
                      {/* <th scope="col">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.userId?.name}</td>
                          <td>{item.guideId?.email}</td>
                          <td style={{ width: "400px" }}>{item.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegistrations;
