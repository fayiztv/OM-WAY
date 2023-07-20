import axios from "axios";
import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import "./userguides.css";
import profile from "../../assets/images/face1.jpg";
import { Link, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

function UserGuides() {
  const [guides, setGuides] = useState([""]);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [guidesPerPage] = useState(9);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/user/guides?name="+name);

        if (!data.err) {
          setGuides(data.guides);
        }
      } catch (err) {
        navigate("/*");
      }
    })();
  }, [refresh,name]);

  const count = guides.length;

  const indexOfLastguide = currentPage * guidesPerPage;
  const indexOfFirstguide = indexOfLastguide - guidesPerPage;
  const currentguide = guides.slice(
    indexOfFirstguide,
    indexOfLastguide
  );
  const startingNumber = (currentPage - 1) * guidesPerPage;
  const calculateSiNo = (index) => startingNumber + index;

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="user-main">
      <UserNavbar />
      <div className="guides-main">
        <div className="guides-head">
          <h3>GUIDES</h3>
          <TextField
            className="searchbar"
            variant="outlined"
            placeholder="Search....."
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </div>
        <div className="guide-body">
          <Row style={{marginRight:'170px'}}>
            {currentguide.map((item, index) => {
              return (
                
                <Col sm={6} md={4} >
                  <Link style={{height:'70%'}} to={"/guide-details/" + item._id}>
                  <div className="guides-card">
                    <div className="guide-profile">
                      <div className="guide-image">
                      
                      <img src={item.image ? item.image :profile} alt="" />
                      </div>
                    </div>
                    <div className="guide-detials" style={{marginTop:'15px'}}>
                      <p>
                        Name : {item.firstName} <br />
                        Contact : {item.contact} <br />
                        Member since : {new Date(item.createdAt).toString().slice(4, 16)}
                        <br />
                      </p>
                    </div>
                  </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </div>
        {guides && (
        <div className="paagination">
          {Array.from(Array(Math.ceil(count / guidesPerPage)).keys()).map(
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
    </div>
  );
}

export default UserGuides;
