import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import "./userguidedetails.css";
import { useParams } from "react-router-dom";
import profile from "../../assets/images/face1.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";

function UserGuideDeatils() {
  const [guide, setGuide] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(4);

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/user/guide-details/" + id);

        if (!data.err) {
          setGuide(data.guide);
          setPackages(data.packages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);

  const count = packages.length;

  const indexOfLastpackage = currentPage * packagesPerPage;
  const indexOfFirstpackage = indexOfLastpackage - packagesPerPage;
  const currentPackage = packages.slice(
    indexOfFirstpackage,
    indexOfLastpackage
  );
  const startingNumber = (currentPage - 1) * packagesPerPage;
  const calculateSiNo = (index) => startingNumber + index;

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  return (
    <div className="user-main">
      <UserNavbar />
      <div className="details-main">
        <div className="profile-card">
          <div className="profile-image" style={{ marginBottom: "30px" }}>
            <img
              className="img-fluid rounded-circle"
              src={guide.image ? guide.image : profile}
              style={{ height: "200px", width: "200px" }}
              alt="Profile image"
            />
          </div>
          <p className="profile-status">
            Status :
            {guide.block ? (
              <span className="text-success" style={{ marginLeft: "12px" }}>
                Not Acitve
              </span>
            ) : (
              <span className="text-success" style={{ marginLeft: "12px" }}>
                Active
              </span>
            )}
          </p>
          <p className="profile-member-since">
            Member since:{" "}
            <span style={{ marginLeft: "12px" }} className="text-success">
              {" "}
              {new Date(guide.createdAt).toString().slice(0, 16)}
            </span>
          </p>
          <div className="profile-data">
            <span>Email:</span>{" "}
            <span className="text-success" style={{ marginLeft: "12px" }}>
              {guide.email}
            </span>
          </div>
        </div>
        <div className="guide-textes-details">
          <div className="details-1">
            <div className="details-name">
              <div className="text-wrapper-4">
                <h6>First Name</h6>
              </div>
              <div className="text-wrapper-5">
                <h6>{guide.firstName}</h6>
              </div>
            </div>
            <div className="details-name">
              <div className="text-wrapper-4">
                <h6>Last Name</h6>
              </div>
              <div className="text-wrapper-5">
                <h6>{guide.lastName}</h6>
              </div>
            </div>
          </div>
          <div className="details-2">
            <div className="details-name" style={{ paddingLeft: "30px" }}>
              <div className="text-wrapper-4">
                <h6>Contact</h6>
              </div>
              <div className="text-wrapper-5">
                <h6>{guide.contact}</h6>
              </div>
              <div className="text-wrapper-4">
                <h6 style={{ marginTop: "35px" }}>Rating</h6>
              </div>
              <div className="text-wrapper-4">
                <h6>Rating</h6>
              </div>
            </div>
            <div className="details-name" style={{ paddingLeft: "0" }}>
              <div className="text-wrapper-4">
                <h6>About</h6>
              </div>
              <div className="text-wrapper-5">
                <h6>{guide.about}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="packages-head"
        style={{ marginLeft: "200px", bottom: "0", marginTop: "10px" }}
      >
        <h3>Packages by {guide.firstName}</h3>
      </div>
      <div className="guide-details-packages">
        <div className="pkgs-body">
          <Row>
            {/* <Col sm={6} md={6} > */}
            {currentPackage.map((item, index) => {
              return (
                <Link to={"/package-details/" + item._id}>
                  <div
                    className="pkg-details"
                    style={{ width: "500px", marginLeft: "60px" }}
                  >
                    <div className="pkg-image">
                      <img src={item.image && item.image.url} alt="" />
                    </div>
                    <div className="pkg-textes">
                      <h5>{item.destionation}</h5>
                      <h4>{item.price}</h4>
                      <p>
                        {item.days} Days , {item.nights} Nights
                      </p>
                      <p>{item.descrption}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
            {/* </Col> */}
          </Row>
        </div>
      </div>
      {packages && (
        <div className="pagination2">
          {Array.from(Array(Math.ceil(count / packagesPerPage)).keys()).map(
            (pageNumber) => (
              <button
                style={{
                  width: "50px",
                  height: "40px",
                  paddingBottom: "35px",
                  marginRight: "10px",
                  backgroundColor: "#147E7D",
                }}
                key={pageNumber}
                onClick={() => handlePaginationClick(pageNumber + 1)}
                disabled={currentPage === pageNumber + 1}
              >
                {pageNumber + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default UserGuideDeatils;
