import axios from "axios";
import React, { useState } from "react";
import UserNavbar from '../UserNavBar/UserNavBar';
import "./userpackages.css";
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Link } from "react-router-dom";

function UserPackages() {
    const [packages, setPackages] = useState([""]);
    const [refresh, setRefresh] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [packagesPerPage] = useState(4);

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

      const count = packages.length

      const indexOfLastpackage = currentPage * packagesPerPage;
      const indexOfFirstpackage = indexOfLastpackage - packagesPerPage;
      const currentPackage = packages.slice(indexOfFirstpackage, indexOfLastpackage);
      const startingNumber=(currentPage-1)*packagesPerPage;
      const calculateSiNo=(index)=>startingNumber+index;
    
      const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
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
        {currentPackage.map((item, index) => {
            return ( 
            <Link to={"/package-details/" + item._id}>
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
            </Link>
              );
            })}
            {/* </Col> */}
            </Row>

        </div>
      </div>
            {
      packages &&<div className='pagination'>
      {Array.from(Array(Math.ceil(count/packagesPerPage)).keys()).map((pageNumber) => (
        <button
        style={{width:'50px',height:'40px',paddingBottom:'35px',marginRight:'10px', backgroundColor:'#147E7D'}}
          key={pageNumber}
          onClick={() => handlePaginationClick(pageNumber + 1)}
          disabled={currentPage === pageNumber + 1}
        >
          {pageNumber + 1}
        </button>
      ))}
    </div>
    }
    </div>
  )
}

export default UserPackages