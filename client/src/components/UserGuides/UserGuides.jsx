import axios from "axios";
import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import "./userguides.css";
import profile from "../../assets/images/face1.jpg";
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

function UserGuides() {
  const [guides, setGuides] = useState([""]);
  const [refresh, setRefresh] = useState(false);
  const [name, setName] = useState("");

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/user/guides?name="+name);

        if (!data.err) {
          setGuides(data.guides);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh,name]);
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
            {guides.map((item, index) => {
              return (
                
                <Col sm={6} md={4} >
                    <Link style={{height:'70%'}} to={"/guide-details/" + item._id}>
                  <div className="guides-card">
                    <div className="guide-profile">
                      <img src={profile} alt="" />
                    </div>
                    <div className="guide-detials" style={{marginTop:'15px'}}>
                      <p>
                        Name : {item.firstName} <br />
                        Contact : {item.contact} <br /> Ratings:
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
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
      </div>
    </div>
  );
}

export default UserGuides;
