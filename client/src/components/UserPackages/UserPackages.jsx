import axios from "axios";
import React, { useState } from "react";
import UserNavbar from '../UserNavBar/UserNavBar';
import "./userpackages.css";
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import image from "../../assets/images/images.jpeg";

function UserPackages() {
    const [packages, setPackages] = useState([""]);
    const [refresh, setRefresh] = useState(false);

    React.useEffect(() => {
        (async function () {
          try {
            const { data } = await axios.get("/user/packages");
    
            if (!data.err) {
              setPackages(data.packages);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      }, [refresh]);
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
        {packages.map((item, index) => {
              return (
            <div className="pkg-details">
            <div className="pkg-image">
            <img src={item.image && item.image.url} alt="" />
            </div>
            <div className="pkg-textes">
               <h5>{item.destionation}</h5>
               <h4>{item.price}</h4>
               <p>{item.days} Days , {item.nights} Nights</p>
               <p>{item.descrption}</p>
            </div>
            </div>
              );
            })}
            {/* </Col> */}
            </Row>
        </div>
      </div>
    </div>
  )
}

export default UserPackages