import axios from "axios";
import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import { useParams } from "react-router-dom";
import "./packagedetails.css";
import { TextField } from "@mui/material";

function UserPackageDetails() {
  const [packages, setPackages] = useState([]);
  const [guideId, setGuideId] = useState([]);
  const [guide, setGuide] = useState([]);
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
          setGuideId(data.packages.guideId)
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);

  React.useEffect(() => {
    (async function () {
      try {
        if(guideId){
          const { data } = await axios.get("/user/package-details-guide/" + guideId);
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
          <h3 style={{marginRight:'100px'}}>{packages.destionation}</h3>
          <div className="price">
          <h3 style={{marginRight:'5px'}}>{packages.price}/- </h3><h5> Per person</h5>
          </div>
          <h6>
            {packages.days} Days , {packages.nights} Nights
          </h6>
          <h6>Activites : {packages.activites}</h6>
          <h6>Places : {packages.places}</h6>
          <h6 style={{marginBottom:'30px'}}>{packages.descrption}</h6>
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
          <input type="date" className="date" value={date}  onChange={(e) => setDate(e.target.value)} />
          <div className="btnn">
            <button>book now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPackageDetails;
