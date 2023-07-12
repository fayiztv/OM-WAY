import React, { useEffect, useState } from "react";
import axios from "axios";
import "./guidehome.css";
import GuideHeader from "../GuideHeader/GuideHeader.jsx";
import profile from "../../assets/images/face1.jpg";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function GuideHome() {
  const guide = useSelector((state) => {
    return state.guide.detials;
  });
  const id=guide._id
  const [image, setImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [errMessage, setErrMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidFileUploaded = (file) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const ImageTOBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFinalImage(reader.result);
    };
  };

  async function handleImage(e) {
    if (isValidFileUploaded(e.target.files[0])) {
      setImage(e.target.files[0]);
      setErrMessage("");
      ImageTOBase(e.target.files[0]);
    } else {
      setErrMessage("Invalid File type");
    }
  }
  useEffect(() => {
    if (finalImage) {
      (async function () {
        let { data } = await axios.patch("/guide/update-avatar", {
          image: finalImage,id
        });
        if (!data.err) {
          dispatch({ type: "refresh" });
          return navigate("/guide");
        } else {
          console.log(data.err);
        }
      })();
    }
  }, [finalImage]);

  return (
    <div className="GUID-HOME">
      <GuideHeader />
      <div className="div">
        <div className="overlap-4">
          <div
            className="profile-card"
            style={{ marginLeft: "120px", marginTop: "20px" }}
          >
            <div className="profile-image">
             
              <img
                className="img-fluid rounded-circle"
                src={guide.image ? guide.image : profile}
                style={{ height: "200px", width: "200px" }}
                alt="Profile image"
              />
               
               <div className="btn-div">
              <input
              style={{opacity:'0'}}
                type="file"
                name="photo"
                className="guide-edit-btn"
                placeholder="edit"
                onChange={handleImage}
                />
                <h1 className="guide-edit">{<FiEdit2 size={20} />}</h1>
                </div>
            </div>
            <p className="profile-status">
              Status :
              {guide.block ? (
                <span className="text-success" style={{ marginLeft: "12px" }}>
                  {" "}
                  Not Acitve
                </span>
              ) : (
                <span className="text-success" style={{ marginLeft: "12px" }}>
                  {" "}
                  Active
                </span>
              )}
            </p>
            <p className="profile-member-since">
              Member since:{" "}
              <span style={{ marginLeft: "12px" }} className="text-success">
                {" "}
                {new Date(guide.createdAt).toString().slice(0, 16)}
              </span>
            </p>
            <div className="profile-data">
              <span>Email:</span>{" "}
              <span className="text-success" style={{ marginLeft: "12px" }}>
                {guide.email}
              </span>
            </div>
          </div>
          <div className="overlap-5">
            <div className="group-4">
              <div className="group-5">
                <div className="text-wrapper-4">First name</div>
                <div className="text-wrapper-5">{guide.firstName}</div>
                <div className="group-6">
                  <div className="text-wrapper-6">Phone number</div>
                  <div className="text-wrapper-7">{guide.contact}</div>
                </div>
              </div>
              <div className="group-7">
                <div className="text-wrapper-8">Last name</div>
                <div className="text-wrapper-9">{guide.lastName}</div>
                <div className="group-8">
                  <div className="text-wrapper-10">About</div>
                  <p className="roaming-the-world-i">{guide.about}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="overlap-7">
            <Link to={"/guide/edit-profile/" + guide._id}>
              <button>Edit</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideHome;
