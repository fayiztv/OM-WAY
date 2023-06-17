import axios from "axios";
import React, { useState } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import Swal from "sweetalert2";
import "./user.css"


function AdminUsers() {
  const [usersList, setUsersList] = useState([""]);
  const [refresh, setRefresh] = useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/admin/users?name=" + name);
        console.log(data);
        if (!data.err) {
          console.log(data);
          setUsersList(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh, name]);

  async function blockUser(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Block this service center",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2C457E",
      cancelButtonColor: " #9BA4B5",
      confirmButtonText: "Yes, Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("/admin/users/block", { id });
        setRefresh(!refresh);
      }
    });
  }

  async function unBlockUser(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Block this service center",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2C457E",
      cancelButtonColor: " #9BA4B5",
      confirmButtonText: "Yes, Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("/admin/users/unblock", { id });
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
            <h2>Users</h2>
            <div
              style={{ width: '70vw'}}
              className="col-lg-6 grid-margin stretch-card"
            >
              <div
                style={{ paddingBottom: "20px" }}
                className="table-responsive"
              >
                <table class="table striped mt-5">
                  <thead className="thead-dark">
                    <tr className="table-head">
                      <th scope="col">SI No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((item, index) => {
                      return (
                        <tr key={index} className={item.block ? "blocked" : ""}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.contact}</td>
                          <td>
                            {item.block ? (
                              <button
                                className="blockButton"
                                onClick={() => unBlockUser(item._id)}
                              >
                                UnBlock
                              </button>
                            ) : (
                              <button onClick={() => blockUser(item._id)}>
                                Block
                              </button>
                            )}
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

export default AdminUsers;
