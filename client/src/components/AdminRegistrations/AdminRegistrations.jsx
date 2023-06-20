import axios from "axios";
import React, { useState } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import "./registraions.css";
import Swal from "sweetalert2";

function AdminRegistrations() {
  const [registrationsList, setRegistrationsList] = useState([""]);
  const [refresh, setRefresh] = useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/admin/registrations?name=" + name);
        console.log(data);
        if (!data.err) {
          setRegistrationsList(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh, name]);

  async function acceptRegistration(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Accept this Registration",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2C457E",
      cancelButtonColor: " #9BA4B5",
      confirmButtonText: "Yes, Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("/admin/registration/accept", { id });
        setRefresh(!refresh);
      }
    });
  }

  async function rejectRegistration(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Reject this Registration",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2C457E",
      cancelButtonColor: " #9BA4B5",
      confirmButtonText: "Yes, Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("/admin/registration/reject", { id });
        setRefresh(!refresh);
      }
    });
  }

  return (
    <div className="container-scroller">
      <AdminHeader />
      {/* <div
        style={{ display: "flex" }}
        className="container-fluid page-body-wrapper"
      > */}
        <AdminSideBar />
        <div className="main-panel">
          <div className="content-wrapper">
            <h2>Registrations</h2>
            <div
              style={{ width: "70vw"}}
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
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">About</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrationsList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.firstName}</td>
                          <td>{item.email}</td>
                          <td style={{width:"430px"}}>{item.about}</td>
                          <td>
                              <button
                              style={{marginRight:"5px"}}
                                className="acceptButton"
                                onClick={() => acceptRegistration(item._id)}
                              >
                                Accept
                              </button>
                              <button
                               style={{marginLeft:"5px"}}
                               className="rejectButton"
                               onClick={() => rejectRegistration(item._id)}>
                                reject
                              </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default AdminRegistrations;
