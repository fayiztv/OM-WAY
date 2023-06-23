import axios from "axios";
import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import banner from "../../assets/images/banner4.jpg";
import "./userhome.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { CardActionArea } from "@mui/material";
import first from "../../assets/images/mysoor-palac.jpg";
import sec from "../../assets/images/goa.jpg";
import third from "../../assets/images/tajmahal.jpg";
import profile from "../../assets/images/face1.jpg";
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

function UserHome() {

  const [guides,setGuides] = useState([""])
  const [refresh, setRefresh] = useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/user/home");
     
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
      <div className="user-banner">
        <img src={banner} alt="" />
      </div>
      <div className="packages">
        <div className="packages-body">
          <div className="packages-text-body">
            <div className="textes">
              <h6>INTRODUCING</h6>
              <h2>
                AMAZING <br></br>Packages
              </h2>
              <p>
                Escape from the safe zone, packed <br></br> with signature
                amenities and services
              </p>
            </div>
            <Link to="/packages">
              <button>Learn More</button>
            </Link>
          </div>
          <div className="packages-details">
            <Card sx={{ maxWidth: 280, marginRight: "20px" }}>
              <CardActionArea className="card">
                <CardMedia
                  className="card-area"
                  component="img"
                  image={first}
                />
                <CardContent>
                  <h3>MYSOOR PALACE</h3>
                  <p>
                    Explore with your guids <br></br> make the trip amezing
                  </p>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 280, marginRight: "20px" }}>
              <CardActionArea className="card">
                <CardMedia className="card-area" component="img" image={sec} />
                <CardContent>
                  <h3>GOA INDIA</h3>
                  <p>
                    Explore with your guids <br></br> make the trip amezing
                  </p>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 280 }}>
              <CardActionArea className="card">
                <CardMedia
                  className="card-area"
                  component="img"
                  image={third}
                />
                <CardContent>
                  <h3>TAJMAHAL</h3>
                  <p>
                    Explore with your guids <br></br> make the trip amezing
                  </p>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
      </div>
      <div className="guides-body">
        <h2>GUIDES</h2>
        <div className="guides-div">
          {guides.map((item,index)=>{
            return(              
          <div className="card">
            <div className="guide-profile">
              <img src={profile} alt="" />
            </div>
            <div className="guide-details">
              <p>
                Name : {item.firstName} <br/>Contact : {item.contact} <br/> Ratings:
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <br/>
              </p>
            </div>
          </div>
            )
          })}
        </div>
      </div>
      <div className="line-body">
      <hr className="line"/>
      </div>
      <footer className="footer">
      <div className="footer-links">
        <Link style={{marginRight:'55px'}} to="/">Home</Link>
        <Link to="/guides">Guides</Link>
        <Link style={{marginLeft:'40px'}} to="/packages">Packages</Link>
      </div>
      <div className="travel-quotes">
        <p>“The world is a book, and those who do not travel read only one page.” - Saint Augustine</p>
        <p>“Travel far, travel wide, travel often.” - Unknown</p>
      </div>
    </footer>
    </div>
  );
}

export default UserHome;
