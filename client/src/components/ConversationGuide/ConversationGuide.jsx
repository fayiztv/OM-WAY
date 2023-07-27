import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import profile from "../../assets/images/face1.png";

const ConversationGuide = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await axios.get("/user/get-user/" + userId);
        setUserData(data.user);
        dispatch({ type: "SAVE_USER", data: data });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={profile}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px", borderRadius: "100%" }}
          />
          {online && <div className="online-dot"></div>}
          <div
            className="name"
            style={{
              fontSize: "0.8rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{userData?.name}</span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : ""}
            </span>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "96%",
          border: "0.1px solid rgb(186 186 186)",
          marginTop: "0",
          marginLeft: "7px",
        }}
      />
    </>
  );
};

export default ConversationGuide;
