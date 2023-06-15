import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import "../UserSignup/signup.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import image from "/src/assets/images/guideregister.png";

function GuideLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    submit: false,
  });

  const validForm = () => {
    if (password.trim() === "" || email.trim() === "") {
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    const { data } = await axios.post("/guide/auth/login", { email, password });
    if (data.err) {
      setErrMessage(data.message);
    } else {
      dispatch({ type: "refresh" });
    }
    setLoading({ ...loading, submit: false });
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
      <Row>
        <div className="login-container">
          <Row>
            <Col md={6}>
              <div className="login-sec bg">
                <img src={image} alt="" />
              </div>
            </Col>
            <Col md={6}>
              <div className="login-sec">
                <form className="login-box" onSubmit={handleSubmit}>
                  <div className="login-row head">
                    <h3>Guide login</h3>
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
                      label="password"
                      variant="standard"
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  {/* <div className="login-row d-flex mt-1 justify-content-start">
                    <Link to="/forgot-password">Forgot Password</Link>
                  </div> */}
                  <div className="login-row">
                    <button
                      type="submit"
                      className="w-100"
                      disabled={!validForm()}
                    >
                      login
                      <ClipLoader
                        size={20}
                        color="white"
                        loading={loading.submit}
                      />
                    </button>
                  </div>
                  <div className="login-row mt-3">
                    <Link to="/guide/register">
                      Register as a Guide? Register
                    </Link>
                  </div>
                  <div className="login-row mt-3">
                    <Link to="/login">Back to user login page</Link>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
}

export default GuideLogin;
