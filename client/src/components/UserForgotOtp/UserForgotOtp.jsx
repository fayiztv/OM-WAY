import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import "../UserSignup/signup.css";
import { Col, Row } from "react-bootstrap";
import otpImage from "/src/assets/images/otp.png";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserReset from "../UserReset/UserReset.jsx";

function UserForgotOtp({ email }) {
  const [errMessage, setErrMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [showReset, setShowReset] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    submit: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    let { data } = await axios.post("/user/auth/forgot-password/verify", { otp });
    if (data.err) {
      setErrMessage(data.message);
    } else {
      setShowReset(true);
    }
    setLoading({ ...loading, submit: false });
  }
  return (
    <>
      {showReset ? (
        <UserReset otp={otp} email={email} />
      ) : (
        <Row>
          <div className="login-container">
            <Row>
              <Col md={6}>
                <div className="login-sec bg">
                  <img src={otpImage} alt="" />
                </div>
              </Col>
              <Col md={6}>
                <form className="login-sec sec-2" onSubmit={handleSubmit}>
                  <div className="login-box">
                    <div className="login-row head">
                      <h3>Verify Email</h3>
                    </div>
                    <div className="login-row head">
                      <b>Enter the OTP</b>
                    </div>
                    <div className="login-row w-100 mt-3">
                      <TextField
                        id="filled-textarea"
                        label="Otp"
                        variant="standard"
                        type="text"
                        fullWidth
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
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
                        disabled={otp.trim() == ""}
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
      )}
    </>
  );
}

export default UserForgotOtp;
