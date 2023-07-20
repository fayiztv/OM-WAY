import axios from "axios";
import React, { useState } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import "./guides.css"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AdminGuides() {
  const [guidesList, setGuidesList] = useState([""]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/admin/guides?name=" + name);
        if (!data.err) {
          setGuidesList(data);
        }
      } catch (err) {
        navigate("/*");
      }
    })();
  }, [refresh, name]);

  async function blockGuide(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Block this Guide",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2C457E",
      cancelButtonColor: " #9BA4B5",
      confirmButtonText: "Yes, Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("/admin/guide/block", { id });
        setRefresh(!refresh);
      }
    }); 
  }

  async function unBlockGuide(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "unBlock this Guide",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2C457E",
      cancelButtonColor: " #9BA4B5",
      confirmButtonText: "Yes, Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("/admin/guide/unblock", { id });
        setRefresh(!refresh);
      }
    });
  }

  return (
    <div className="container-scroller">
      <AdminHeader />
        <AdminSideBar />
        <div className="main-panel">
          <div className="content-wrapper">
            <h2>Guides</h2>
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
                      <th scope="col">Contact</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guidesList.map((item, index) => {
                      return (
                        <tr key={index} className={item.block ? "blocked" : ""}>
                          <td>{index + 1}</td>
                          <td>{item.firstName}</td>
                          <td>{item.email}</td>
                          <td>{item.contact}</td>
                          <td>
                            {item.block ? (
                              <button
                                className="blockButton"
                                onClick={() => unBlockGuide(item._id)}
                              >
                                UnBlock
                              </button>
                            ) : (
                              <button onClick={() => blockGuide(item._id)}>
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
    </div>
  );
}

export default AdminGuides;
