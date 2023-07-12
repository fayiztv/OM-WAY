import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import image from "/src/assets/images/guideregister.png";
import "../UserSignup/signup.css";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import SuccessPage from "../GuideSuccess/GuideSuccess.jsx";

function GuideRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [loading, setLoading] = useState({
    submit: false,
  });

  const validForm = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      number.toString().length !== 10 ||
      about.trim() === "" 
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
        let { data } = await axios.post("/guide/auth/register", {
          firstName,
          lastName,
          email,
          password,
          number,
          about,
        });
        if (data.err) {
          setErrMessage(data.message);
        } else {
          setShowSuccessPage(true);
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
      {!showSuccessPage ? (
        <Row>
          <div className="login-container">
            <Row>
              <Col md={6} sm={4}>
                <div className="login-sec bg">
                  <img src={image} alt="" />
                </div>
              </Col>
              <Col md={6} sm={8}>
                <div className="login-sec">
                  <form className="login-box" onSubmit={handleSubmit}>
                    <div className="login-row head">
                      <h3>Guide Registeration</h3>
                    </div>
                    <div style={{paddingRight:"2px"}} className="login-row w-100 mt-3">
                      <TextField
                        style={{width:"150px",marginRight:"5px"}}
                        id="filled-textarea"
                        label="First name"
                        variant="standard"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <TextField
                        style={{width:"150px",marginLeft:"5px"}}
                        id="filled-textarea"
                        label="Last name"
                        variant="standard"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                    <div className="login-row w-100">
                      <TextField
                        id="filled-textarea"
                        label="Password"
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
                        label="about"
                        variant="standard"
                        type="about"
                        fullWidth
                        multiline
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
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
                      >
                        Register
                        <ClipLoader
                          size={20}
                          color="white"
                          loading={loading.submit}
                        />
                      </button>
                    </div>
                    <div className="login-row mt-3">
                      <Link to="/guide/login">Already Have an Guide Account? Login</Link>
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
      ) : (
        <SuccessPage/>
      )}
    </div>
  );
}

export default GuideRegister;
