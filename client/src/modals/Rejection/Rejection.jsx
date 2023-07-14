import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { TextField } from "@mui/material";
import "./rejection.css";
import axios from "axios";
import { useDispatch } from "react-redux";

function Rejection({ setShowModal, id }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch()
  async function handleClose() {
    setShowModal(false);
  }
  const validForm = () => {
    if (text.trim() === "") {
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validForm()) {
      let { data } = await axios.post("/admin/registration/reject", {
        text,
        id
      });
      if (data.err) {
        console.log(data.err);
      } else {
        setShowModal(false);
        dispatch({type:"refresh"})
      }
    }
  };
  return (
    <div className="cp-main">
      <div className="custom-package-detials">
        <div className="close">
          <RiCloseLine onClick={handleClose} />
        </div>
        <h3>Rejection message</h3>
        <TextField
          id="filled-textarea"
          label="Message"
          variant="standard"
          type="text"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          style={{marginTop:"15px"}}
          className="submitButton"
          onClick={handleSubmit}
          disabled={!validForm()}
        >submit</button>
      </div>
    </div>
  );
}

export default Rejection;
