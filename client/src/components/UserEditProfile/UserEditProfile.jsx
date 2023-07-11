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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    submit: false,
  });

  function validForm() {
    if (contact.toString().length == 10|| name.replaceAll(" ", "") === "") {
      return true;
    }
    return false;
  }
  const { id } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();
    if (validForm()) {
      
      let { data } = await axios.post("user/edit-profile", {
        name,
        email,
        contact,
        id,
      });
      if (!data.error) {
        dispatch({ type: "refresh" });
        return navigate("/");
      } else {
        setErrMessage(data.message);
      }
    }
  }

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("user/edit-profile/" + id);
      setName(data.name);
      setEmail(data.email);
      setContact(data.contact);
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
                        disabled
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
                        value={contact}
                        onChange={(e) => {
                          if (e.target.value.toString().length <= 10) {
                            setContact(e.target.value);
                          }
                        }}
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
