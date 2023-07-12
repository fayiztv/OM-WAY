import React, { useState } from "react";
import "./guidehome.css";
import GuideHeader from "../GuideHeader/GuideHeader.jsx";
import profile from "../../assets/images/face1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function GuideHome() {
  const guide = useSelector((state) => {
    return state.guide.detials;
  });
  return (
    <div className="GUID-HOME">
      <GuideHeader />
      <div className="div">
        <div className="overlap-4">
          <div className="profile-card" style={{marginLeft:'120px',marginTop:'20px'}}>
            <div className="profile-image">
              <img
                className="img-fluid rounded-circle"
                src={profile}
                style={{ height: "200px", width: "200px"}}
                alt="Profile image"
              />
              <button className="guide-edit-btn"><FontAwesomeIcon  icon={faEdit} /></button>
            </div>
            <p className="profile-status">
              Status : <span className="text-success" style={{marginLeft:'12px'}}> Active</span>
            </p>
            <p className="profile-member-since">
              Member since: <span style={{marginLeft:'12px'}}>2023-01-01</span>
            </p>
            <div className="profile-data">
              <span>Email:</span> <span style={{marginLeft:'12px'}}>johndoe@example.com</span>
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
