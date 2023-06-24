import React, { useState } from "react";
import GuideHeader from "../GuideHeader/GuideHeader";
import { TextField } from "@mui/material";
import "./addpackage.css";

function GuideAddPackage() {

    const [destionation,setDestination] = useState('')
    const [price,setPrice] = useState('')
    const [activites,setActivites] = useState([])
    const [days,setDays] = useState('')
    const [nigths,setNights] = useState('')
    const [places,setPlaces] = useState([])
    const [time,setTime] = useState('')
    const [descrption,setDescrption] = useState('')

  return (
    <div className="GUID-HOME">
      <GuideHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          marginLeft: "60px",
        }}
        className="overlap-4"
      >
        <div className="heading">
          <h2 style={{ color: "#14505C", opacity: "80%" }}>Add Package</h2>
        </div>
        <div className="fields">
          <div className="first-div">
            <div className="login-row w-100 mt-3">
              <TextField
                className="textarea"
                label="Destination"
                placeholder="Enter main destionation"
                variant="standard"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="login-row w-100 mt-3">
              <TextField
                className="textarea"
                label="Price"
                placeholder="Enter package's price"
                variant="standard"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="login-row w-100 mt-3">
              <TextField
                className="textarea"
                label="Activites"
                placeholder="Add activites"
                variant="standard"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="second-div">
            <div className="login-row w-100 mt-3">
              <TextField
                className="textarea"
                label="Days"
                placeholder="Days in this trip"
                variant="standard"
                type="number"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="login-row w-100 mt-3">
              <TextField
                className="textarea"
                label="Nights"
                placeholder="Nights in trip"
                variant="standard"
                type="number"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="login-row w-100 mt-3">
              <TextField
                className="textarea"
                label="Visiting place"
                placeholder="Add visiting place"
                variant="standard"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="third-div">
            <div className="login-row w-100 mt-3">
              <TextField
                className="textarea"
                label="Time"
                placeholder="Starting time"
                variant="standard"
                type="time"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="login-row w-100 mt-3">
              <TextField
                className="textarea"
                label="Descrption"
                placeholder="Enter Descriptions"
                variant="standard"
                type="text"
                multiline
                // fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="login-row w-100 mt-3">
              <TextField
                className="textarea"
                label="Images"
                placeholder="Add images"
                variant="standard"
                type="file"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideAddPackage;
