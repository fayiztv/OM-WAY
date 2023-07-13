import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import "./userguidedetails.css";
import { useParams } from "react-router-dom";
import profile from "../../assets/images/face1.jpg";
import axios from "axios";

function UserGuideDeatils() {
  const [guide, setGuide] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/user/guide-details/" + id);

        if (!data.err) {
          setGuide(data.guide);
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
        <div
          className="profile-card"
        >
          <div className="profile-image" style={{ marginBottom: "30px" }}>
            <img
              className="img-fluid rounded-circle"
              src={guide.image ? guide.image : profile}
              style={{ height: "200px", width: "200px" }}
              alt="Profile image"
            />
          </div>
          <p className="profile-status">
            Status :
            {guide.block ? (
              <span className="text-success" style={{ marginLeft: "12px" }}>
                Not Acitve
              </span>
            ) : (
              <span className="text-success" style={{ marginLeft: "12px" }}>
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
        <div className="guide-textes-details">
            <div className="details-1">
                <div className="details-name">
                <div className="text-wrapper-4"><h6>First Name</h6></div>
                <div className="text-wrapper-5"><h6>{guide.firstName}</h6></div>
                </div>
                <div className="details-name">
                <div className="text-wrapper-4"><h6>Last Name</h6></div>
                <div className="text-wrapper-5"><h6>{guide.lastName}</h6></div>
                </div>
            </div>
            <div className="details-2">
            <div className="details-name"style={{paddingLeft:'30px'}}>
                <div className="text-wrapper-4"><h6>Contact</h6></div>
                <div className="text-wrapper-5"><h6>{guide.contact}</h6></div>
                <div className="text-wrapper-4"><h6 style={{marginTop:'35px'}}>Rating</h6></div>
                <div className="text-wrapper-4"><h6>Rating</h6></div>

                </div>
                <div className="details-name" style={{paddingLeft:'0'}}>
                <div className="text-wrapper-4"><h6>About</h6></div>
                <div className="text-wrapper-5"><h6>{guide.about}</h6></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default UserGuideDeatils;
