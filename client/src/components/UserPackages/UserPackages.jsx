import React from 'react'
import UserNavbar from '../UserNavBar/UserNavBar';
import "./userpackages.css";
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import image from "../../assets/images/images.jpeg";

function UserPackages() {
  return (
    <div className="user-main">
      <UserNavbar />
      <div className="packages-main">
        <div className="packages-head">
          <h3>PACKAGES</h3>
        </div>
        <div className="pkgs-body">
        <Row style={{marginRight:'170px'}}>
        {/* <Col sm={6} md={6} > */}
            <div className="pkg-details">
            <div className="pkg-image">
            <img src={image} alt="" />
            </div>
            <div className="pkg-textes">
               <h3>dfgh</h3>
               awehfbas;
               dsfads
               asdfa
               fgg 
            </div>
            </div>

            {/* </Col> */}
            </Row>
        </div>
      </div>
    </div>
  )
}

export default UserPackages