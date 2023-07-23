import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import "./complaint.css";

function AddComplaint({ setShowModal }) {
  const [description, setDescription] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [guides, setGuides] = useState([]);
  const [complaintAgainst, setComplaintAgainst] = useState("");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    submit: false,
  });
  useEffect(() => {
    (async function () {
      const guideData = await axios.get("/user/guides?name=" + name);
      if (!guideData.err) {
        setGuides(guideData.data.guides);
      }
    })();
  }, [name]);


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    if (validForm()) {
      const { data } = await axios.post("/user/complaint", {
        complaintAgainst,
        description,
      });
      if (!data.err) {
        Swal.fire(
          "Success!",
          'Your complaint is registered with complaint Id "' +
            data.complaint.complaintId +
            '". We will take actions within 2 days.',
          "success"
        );
        setShowModal(false);
      }

      setLoading({ ...loading, submit: false });
    }
  }
  function validForm() {
    if (description === "" || complaintAgainst === "") {
      return false;
    }
    return true;
  }

  return (
    <div className="modal-form">
      <form className="modal-container complaint" onSubmit={handleSubmit}>
        <div className="modal-form-row head">
          <h5>Register Complaint</h5>
        </div>

        <div className="modal-form-row">
          <Form.Select
            aria-label="Default select example"
            value={complaintAgainst}
            onChange={(e) => setComplaintAgainst(e.target.value)}
          >
            <option value="">Select Guide</option>
            {guides.map((item, index) => {
              return (
                <option key={index} value={item._id}>
                  {item.firstName}
                </option>
              );
            })}
          </Form.Select>
        </div>

        <div className="modal-form-row">
          <TextField
            id="outlined-basic"
            value={description}
            multiline
            onChange={(e) => setDescription(e.target.value)}
            minRows={10}
            label="description"
            type="text"
            variant="outlined"
            fullWidth
            className="input"
          />
        </div>

        {errMessage && (
          <div className="modal-form-row">
            <b>{errMessage}</b>
          </div>
        )}
        <div className="modal-form-row2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="btn btn-outline-dark"
            style={{width:'220px',marginRight:'10px'}}
          >
            close
          </button>
          <button
            type="submmit"
            disabled={!validForm()}
            className="btn btn-dark"
            style={{width:'230px',border:'none'}}
          >
            Register Complaint
            <ClipLoader size={20} color="white" loading={loading.submit} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddComplaint;
