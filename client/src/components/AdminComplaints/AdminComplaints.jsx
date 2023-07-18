import axios from "axios";
import React, { useState } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import "../AdminRegistrations/registraions.css";
import Complaint from "../../modals/AdminComplaint/AdminComplaint";

function AdminRegistrations() {
  const [complaints, setComplaints] = useState([""]);
  const [complaint, setComplaint] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [guideId, setGuideId] = useState(null);
  const [id, setId] = useState(null);

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

  async function SentMail(guideid,description,id) {
    setGuideId(guideid)
    setComplaint(description)
    setId(id)
    setShowModal(true);
  }

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
                      <th scope="col">Action</th>
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
                          {item.mailsent === false ? <td><button onClick={() => SentMail(item.guideId?._id,item.description,item._id)}  style={{width:'100px'}}>send Mail</button></td>
                          :
                          <td>Mail sented</td>
                          }
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="modals">{showModal && <Complaint setShowModal={setShowModal} guideid={guideId} id={id} complaint={complaint} />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegistrations;
