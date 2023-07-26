import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import profile from "../../assets/images/profile2.png";

const Conversation = ({ data, currentUser, online }) => {
  const [guideData, setGuideData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const guideId = data.members.find((id) => id !== currentUser);
    const getGuideData = async () => {
      try {
        const { data } = await axios.get("guide/get-guide/" + guideId);
        setGuideData(data.guide);
        dispatch({ type: "SAVE_USER", data: data });
      } catch (error) {
        console.log(error);
      }
    };

    getGuideData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img
            src={
              guideData?.image?guideData.image:profile
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px",borderRadius:'100%'}}
            />
            {online && <div className="online-dot"></div>}
          <div className="name" style={{ fontSize: "0.8rem" ,display:'flex',flexDirection:'column'}}>
            <span>{guideData?.firstName}</span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "."}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec",margin:'0px'}} />
    </>
  );
};

export default Conversation;
