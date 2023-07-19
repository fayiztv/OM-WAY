import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import loginImage from "/src/assets/images/editprofile.png";
import "../UserSignup/signup.css";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UserEditProfile() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [about, setAbout] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    submit: false,
  });

  const validForm = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      contact.toString().length !== 10 ||
      about.trim() === "" 
    ) {
      return false;
    }
    return true;
  };
  const { id } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();
    if (validForm()) {
      let { data } = await axios.post("/guide/edit-profile", {
        firstName,
        lastName,
        email,
        contact,
        about,
        id,
      });
      console.log(data);
      if (!data.error) {
        dispatch({ type: "refresh" });
        return navigate("/guide/profile");
      } else {
        setErrMessage(data.message);
      }
    }
  }

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/guide/edit-profile/" + id);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setContact(data.contact);
      setAbout(data.about);
    })();
  }, []);
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
              <Col md={6} sm={4}>
                <div className="login-sec bg" style={{marginLeft:'200px'}}>
                  <img src={loginImage} alt="" />
                </div>
              </Col>
              <Col md={6} sm={8}>
                <div className="login-sec">
                  <form className="login-box" onSubmit={handleSubmit}>
                    <div className="login-row head">
                      <h3>Edit your profile</h3>
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
                    <div className="login-row">
                      <TextField
                        id="filled-textarea"
                        label="Phone number"
                        variant="standard"
                        type="number"
                        fullWidth
                        value={contact}
                        onChange={(e) => {
                          if (e.target.value.toString().length <= 10) {
                            setContact(e.target.value);
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
                        Edit
                        <ClipLoader
                          size={20}
                          color="white"
                          loading={loading.submit}
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
    </div>
  )
}

export default UserEditProfile;
