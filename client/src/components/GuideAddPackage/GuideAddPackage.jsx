import React, { useState } from "react";
import GuideHeader from "../GuideHeader/GuideHeader";
import { TextField } from "@mui/material";
import "./addpackage.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

function GuideAddPackage() {
  const [destionation, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [activites, setActivites] = useState("");
  const [days, setDays] = useState("");
  const [nights, setNights] = useState("");
  const [places, setPlaces] = useState("");
  const [descrption, setDescrption] = useState("");
  const [image, setImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState({
    submit: false,
  });
  const guide=useSelector((state)=>{
    return state.guide.detials
  });

  const validForm = () => {
    if (
      destionation.trim() === "" ||
      price === "" ||
      activites.trim() === "" ||
      days === "" ||
      nights === "" ||
      places.trim() === "" ||
      descrption.trim() === ""
    ) {
      return false;
    }
    return true;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidFileUploaded = (file) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleImage = (e) => {
    if (isValidFileUploaded(e.target.files[0])) {
      setImage(e.target.files[0]);
      setErrMessage("");
      ImageTOBase(e.target.files[0]);
    } else {
      setErrMessage("Invalid File type");
    }
  };

  const ImageTOBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFinalImage(reader.result);
    };
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (validForm()) {
      if (!loading.submit) {
        setLoading({ ...loading, submit: true });
      let { data } = await axios.post("/guide/add-package", {
        destionation,
        price,
        activites,
        days,
        nights,
        places,
        descrption,
        guideId:guide._id,
        packageImage: finalImage,
      });

      if (!data.err) {
        dispatch({ type: "refresh" });
        navigate("/guide/packages");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message,
        });
      }
      setLoading({ ...loading, submit: false });
    }
  }
  }

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
          <form onSubmit={handleSubmit}>
            <div className="first-div">
              <div className="login-row w-100 mt-3">
                <TextField
                  className="textarea"
                  label="Destination"
                  placeholder="Enter main destionation"
                  variant="standard"
                  type="text"
                  fullWidth
                  value={destionation}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="login-row w-100 mt-3">
                <TextField
                  className="textarea"
                  label="Price"
                  placeholder="Enter package's price"
                  variant="standard"
                  type="number"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="login-row w-100 mt-3">
                <TextField
                  className="textarea"
                  label="Days"
                  placeholder="Days in this trip"
                  variant="standard"
                  type="number"
                  fullWidth
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
            </div>

            <div className="second-div">
              <div className="login-row w-100 mt-3">
                <TextField
                  className="textarea"
                  label="Nights"
                  placeholder="Nights in trip"
                  variant="standard"
                  type="number"
                  fullWidth
                  value={nights}
                  onChange={(e) => setNights(e.target.value)}
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
                  multiline
                  value={activites}
                  onChange={(e) => setActivites(e.target.value)}
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
                  multiline
                  value={places}
                  onChange={(e) => setPlaces(e.target.value)}
                />
              </div>
            </div>
            <div className="third-div">
              <div className="login-row w-100 mt-3">
                <TextField
                  className="d-textarea"
                  label="Descrption"
                  placeholder="Enter Descriptions"
                  variant="standard"
                  type="text"
                  multiline
                  fullWidth
                  value={descrption}
                  onChange={(e) => setDescrption(e.target.value)}
                />
              </div>
              <div className="login-row w-100 mt-3">
                <TextField
                  className="textarea"
                  label="Image"
                  placeholder="Add image"
                  variant="standard"
                  type="file"
                  fullWidth
                  onChange={handleImage}
                />
              </div>
            </div>
            <div className="submit-buttonn">
              <button  type="submit" disabled={!validForm()}>
                submit
                <ClipLoader size={20} color="white" loading={loading.submit} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GuideAddPackage;
