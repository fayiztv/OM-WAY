import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { TextField } from "@mui/material";
import "../Rejection/rejection.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

function Rejection({ setShowModal,complaint, guideid,id }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch()
  const [loading, setLoading] = useState({
    submit: false,
  });
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
      if (!loading.submit) {
        setLoading({ ...loading, submit: true });
      let { data } = await axios.post("/admin/complaints/sent-mail", {
        text,
        complaint,
        guideid,
        id
      });
      if (data.err) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: data.err.message,
        });
      } else {
        setShowModal(false);
        dispatch({type:"refresh"})
      }
      setLoading({ ...loading, submit: false });
    }
  }
  };
  return (
    <div className="cp-main">
      <div className="custom-package-detials">
        <div className="close">
          <RiCloseLine onClick={handleClose} />
        </div>
        <h3>Message</h3>
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
          style={{marginTop:"15px",display:'flex',gap:'10px'}}
          className="submitButton"
          onClick={handleSubmit}
          disabled={!validForm()}
        >submit
        <ClipLoader size={20} color="white" loading={loading.submit} />
        </button>
      </div>
    </div>
  );
}

export default Rejection;
