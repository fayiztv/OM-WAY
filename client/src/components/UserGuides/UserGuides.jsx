import axios from "axios";
import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import "./userguides.css";
import profile from "../../assets/images/face1.jpg";
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function UserGuides() {
  const [guides, setGuides] = useState([""]);
  const [refresh, setRefresh] = useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/user/guides");

        if (!data.err) {
          setGuides(data.guides);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);
  return (
    <div className="user-main">
      <UserNavbar />
      <div className="guides-main">
        <div className="guides-head">
          <h3>GUIDES</h3>
        </div>
        <div className="guide-body">
          <Row>
            {guides.map((item, index) => {
              return (
                <Col xs={6} md={4}>
                  <div className="guides-card">
                    {/* <Link to={"/guide-details/" + item._id}> */}
                    <div className="guide-profile">
                      <img src={profile} alt="" />
                    </div>
                    <div className="guide-detials">
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
                    {/* </Link> */}
                  </div>
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
