import axios from "axios";
import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import { useParams } from "react-router-dom";
import "./packagedetails.css";
import { TextField } from "@mui/material";

function UserPackageDetails() {
  const [packages, setPackages] = useState([]);
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
          console.log(data.packages);
          setPackages(data.packages);
          console.log(packages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);
  return (
    <div className="user-main">
      <UserNavbar />
      <div className="details-main">
        <div className="package-img-btn">
          <div className="img">
            <img src={packages.image && packages.image.url} alt="" />
          </div>
        </div>
        <div className="package-details">
          <h5>{packages.destionation}</h5>
          <h4>{packages.price}/- Per person</h4>
          <h5>
            {packages.days} Days , {packages.nights} Nights
          </h5>
          <h5>Activites : {packages.activites}</h5>
          <h5>Places : {packages.places}</h5>
          <h6>{packages.descrption}</h6>
          <br />
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
          <br />
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
