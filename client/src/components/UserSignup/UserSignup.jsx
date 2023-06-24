import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import loginImage from "/src/assets/images/login2.png";
import "../UserSignup/signup.css";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import VerifyOtp from "../VerifyOtp/VerifyOtp.jsx";

function UserSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConPassword, setConPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState({
    submit: false,
  });

  const validForm = () => {
    if (
      name.trim() === "" ||
      password.trim() === "" ||
      email.trim() === "" ||
      password !== ConPassword ||
      number.toString().length !== 10
    ) {
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validForm()) {
      if (!loading.submit) {
        setLoading({ ...loading, submit: true });
        let { data } = await axios.post("/user/auth/sign-up", {
          email,
          password,
          number,
          name,
        });
        if (data.err) {
          setErrMessage(data.message);
        } else {
          setShowOtpPage(true);
        }
        setLoading({ ...loading, submit: false });
      }
    }
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
      {!showOtpPage ? (
        <Row>
          <div className="login-container">
            <Row>
              <Col md={6} sm={4}>
                <div className="login-sec bg">
                  <img src={loginImage} alt="" />
                </div>
              </Col>
              <Col md={6} sm={8}>
                <div className="login-sec">
                  <form className="login-box" onSubmit={handleSubmit}>
                    <div className="login-row head">
                      <h3>Signup</h3>
                    </div>
                    <div className="login-row w-100 mt-3">
                      <TextField
                        id="filled-textarea"
                        label="Name"
                        variant="standard"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
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
                    <div className="login-row">
                      <TextField
                        id="filled-textarea"
                        label="Phone number"
                        variant="standard"
                        type="number"
                        fullWidth
                        value={number}
                        onChange={(e) => {
                          if (e.target.value.toString().length <= 10) {
                            setNumber(e.target.value);
                          }
                        }}
                      />
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
                        value={ConPassword}
                        onChange={(e) => setConPassword(e.target.value)}
                      />
                    </div>
                    {password !== ConPassword && (
                      <div
                        className="login-row"
                        style={{ justifyContent: "flex-start" }}
                      >
                        <p className="text-danger text-left                                                                                                                                    ">
                          Password Not Match
                        </p>
                      </div>
                    )}
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
                      >
                        Sign In
                        <ClipLoader
                          size={20}
                          color="white"
                          loading={loading.submit}
                        />
                      </button>
                    </div>
                    <div className="login-row mt-3">
                      <Link to="/login">Already Have an Account? Login</Link>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
      ) : (
        <VerifyOtp data={{ name, email, number, password }} />
      )}
    </div>
  );
}

export default UserSignup;
