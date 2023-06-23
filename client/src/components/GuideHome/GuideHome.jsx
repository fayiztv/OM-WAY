
import React, { useState } from "react";
import "./guidehome.css";
import GuideHeader from "../GuideHeader/GuideHeader.jsx";
import profile from "../../assets/images/face1.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

 function GuideHome() {
  const guide =useSelector((state)=>{
    return state.guide.detials
  });
  return (
    <div className="GUID-HOME">
        <GuideHeader/>
      <div className="div">
        <div className="overlap-4">
          <div className="group-3">
            <img src={profile} alt="" />
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
                  <p className="roaming-the-world-i">
                   {guide.about}
                  </p>
                </div>
              </div>
            </div>
            <div className="group-9">
              <div className="text-wrapper-11">Education Qualifications</div>
              <p className="p">BBA in travel and tourism</p>
            </div>
            <div className="div-wrapper">
              <div className="overlap-6">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </div>
          <div className="text-wrapper-12">YOUR PROFILE</div>
          <div className="overlap-7">
          <button>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideHome