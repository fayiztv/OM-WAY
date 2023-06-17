import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CircularProgress, TextField } from "@mui/material";
import resetImage from "/src/assets/images/resetPassword.png";
import "../UserSignup/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function UserReset({ email, otp }) {
  const [errMessage, setErrMessage] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState({
    submit: false,
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    const { data } = await axios.post("/user/auth/forgot-password/reset", {
      otp,
      email,
      password,
    });
    if (data.err) {
      setErrMessage(data.message);
    } else {
      navigate("/login");
    }
    setLoading({ ...loading, submit: false });
  }

  const validForm = () => {
    if (password.trim() === "" || password != conPassword) {
      return false;
    }
    return true;
  };

  return (
    <Row>
      <div className="login-container">
        <Row>
          <Col md={6}>
            <div className="login-sec bg">
              <img src={resetImage} alt="" />
            </div>
          </Col>
          <Col md={6}>
            <form className="login-sec sec-2" onSubmit={handleSubmit}>
              <div className="login-box">
                <div className="login-row head">
                  <h3>Change Password</h3>
                </div>

                <div className="login-row">
                  <TextField
                    id="filled-textarea"
                    label="password"
                    variant="standard"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="login-row">
                  <TextField
                    id="filled-textarea"
                    label="Confirm password"
                    variant="standard"
                    type="password"
                    fullWidth
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                  />
                </div>
                {errMessage && (
                  <div
                    className="login-row"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <p className="text-danger">{errMessage}</p>
                  </div>
                )}
                <div className="login-row">
                  <button
                    className="w-100"
                    type="submit"
                    disabled={!validForm()}
                    onClick={handleSubmit}
                  >
                    Next
                    <ClipLoader
                      size={20}
                      color="white"
                      loading={loading.submit}
                    />
                  </button>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Row>
  );
}
