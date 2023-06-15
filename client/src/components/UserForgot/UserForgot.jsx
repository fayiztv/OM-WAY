import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CircularProgress, TextField } from "@mui/material";
import "../UserSignup/signup.css";
import forgotImage from "/src/assets/images/forgot.png";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import UserForgotOtp from "../UserForgotOtp/UserForgotOtp.jsx";

function UserForgot() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validForm = () => {
    if (email.trim() === "") {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (validForm()) {
      const { data } = await axios.post("/user/auth/forgot", { email });
      if (data.err) {
        setErrMessage(data.message);
      } else {
        console.log(data.user);
        setOtp(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-main">
      <Row>
        <nav className="login-nav">
          <Container>
            <Row>
              <h3>onmyWay</h3>
            </Row>
          </Container>
        </nav>
      </Row>
      {otp ? (
        <UserForgotOtp email={email} />
      ) : (
        <Row>
          <div className="login-container">
            <Row>
              <Col md={6}>
                <div className="login-sec bg">
                  <img src={forgotImage} alt="" />
                </div>
              </Col>
              <Col md={6}>
                <div className="login-sec">
                  <div className="login-box">
                    <div className="login-row head">
                      <h3>Forgot Password</h3>
                    </div>
                    <div className="login-row head">
                      <b>Enter the email</b>
                    </div>
                    <div className="login-row w-100">
                      <TextField
                        id="filled-textarea"
                        label="Email"
                        variant="standard"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        disabled={!validForm()}
                        onClick={handleSubmit}
                      >
                        Next
                        <ClipLoader size={20} color="white" loading={loading} />
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
      )}
    </div>
  );
}

export default UserForgot;
