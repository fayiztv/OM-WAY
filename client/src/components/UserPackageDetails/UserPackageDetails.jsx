import axios from "axios";
import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import { useParams } from "react-router-dom";
import "./packagedetails.css";
import profile from "../../assets/images/face1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function UserPackageDetails() {
  const [packages, setPackages] = useState([]);
  const [guideId, setGuideId] = useState([]);
  const [guide, setGuide] = useState([]);
  const [flage, setFlage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const [guestes, setGuestes] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSelectChange = (event) => {
    setGuestes(event.target.value);
  };

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/user/package-details/" + id);

        if (!data.err) {
          setPackages(data.packages);
          setGuideId(data.packages.guideId);
          setFlage(true);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);

  React.useEffect(() => {
    (async function () {
      try {
        if (flage === true) {
          const { data } = await axios.get(
            "/user/package-details-guide/" + guideId
          );
          if (!data.err) {
            console.log(data.guide);
            setGuide(data.guide);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [guideId]);

  return (
    <div className="user-main">
      <UserNavbar />
      <div className="package-details-main">
        <div className="package-img">
          <img src={packages.image && packages.image.url} alt="" />
        </div>
        <div className="package-details">
          <h3 style={{ marginRight: "100px" }}>{packages.destionation}</h3>
          <div className="price">
            <h3 style={{ marginRight: "5px" }}>{packages.price}/- </h3>
            <h5> Per person</h5>
          </div>
          <h6>
            {packages.days} Days , {packages.nights} Nights
          </h6>
          <h6>Activites : {packages.activites}</h6>
          <h6>Places : {packages.places}</h6>
          <h6 style={{ marginBottom: "20px" }}>{packages.descrption}</h6>
          <p>select guestes</p>
          <select
            className="dropdown"
            value={guestes}
            onChange={handleSelectChange}
          >
            <option value="option1">1 Person</option>
            <option value="option2">2 Persons</option>
            <option value="option3">3 Persons</option>
            <option value="option3">4 Persons</option>
            <option value="option3">5 Persons</option>
            <option value="option3">6 Persons</option>
            <option value="option3">7 Persons</option>
            <option value="option3">8 Persons</option>
            <option value="option3">9 Persons</option>
            <option value="option3">10 Persons</option>
          </select>
          <p>select your starting date</p>
          <input
            type="date"
            className="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="btnn">
            <button>book now</button>
          </div>
        
        <Link style={{ height: "70%" }} to={"/guide-details/" + guide._id}>
          <div className="guides-card">
            <div className="guide-profile">
              <div className="guide-image">
                <img src={guide.image ? guide.image : profile} alt="" />
              </div>
            </div>
            <div className="guide-detials" style={{ marginTop: "15px" }}>
              <p>
                Name : {guide.firstName} <br />
                Contact : {guide.contact} <br /> Ratings:
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
        </div>
      </div>
    </div>
  );
}

export default UserPackageDetails;
