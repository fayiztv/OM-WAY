import axios from "axios";
import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import banner from "../../assets/images/banner.png";
import "./userhome.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";


function UserHome() {
  const [packages, setPackages] = useState([""]);
  const [refresh, setRefresh] = useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/user/home");

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
      <div className="user-banner">
        <img src={banner} alt="" />
      </div>
      <div data-aos="zoom-in-up" className="packages">
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
              <button>View More</button>
            </Link>
          </div>
          <div className="packages-details">
            {packages.map((item, index) => {
              return (
                <Link to={"/package-details/" +item._id}>

                <Card sx={{ maxWidth: 280, marginRight: "20px" }}>
                  <CardActionArea className="card">
                    <CardMedia
                      style={{height:'190px'}}
                      className="card-area"
                      component="img"
                      image={item.image && item.image.url}
                    />
                    <CardContent>
                      <h3>{item.destionation}</h3>
                      <p>
                        Explore with your guids <br></br> make the trip amazing
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
                      </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="line-body">
        <hr className="line" />
      </div>
      <footer className="footer">
        <div className="footer-links">
          <Link style={{ marginRight: "55px" }} to="/">
            Home
          </Link>
          <Link to="/guides">Guides</Link>
          <Link style={{ marginLeft: "40px" }} to="/packages">
            Packages
          </Link>
        </div>
        <div className="travel-quotes">
          <p>
            “The world is a book, and those who do not travel read only one
            page.” - Saint Augustine
          </p>
          <p>“Travel far, travel wide, travel often.” - Unknown</p>
        </div>
      </footer>
    </div>
  );
}

export default UserHome;
