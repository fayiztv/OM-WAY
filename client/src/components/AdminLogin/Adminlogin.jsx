import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import adminLoginImage from "../../assets/images/adminLogin.png";
import "../UserSignup/signup.css";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";

function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();

  const validFrom = () => {
    if (password.trim() === "" || email.trim() === "") {
      return false;
    }
    return true;
  };

  const [loading, setLoading] = useState({
    submit: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    const { data } = await axios.post("/admin/auth/login", { email, password });
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
                <img src={adminLoginImage} alt="" />
              </div>
            </Col>
            <Col md={6}>
              {/* <div className="login-row head">
                                        <h3>Admin</h3>
                                    </div> */}
              <div className="login-sec">
                <form onSubmit={handleSubmit} className="login-box">
                  <div className="login-row head">
                    <h3>Admin login</h3>
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
                  <div className="login-row">
                    <button
                      type="submit"
                      className="w-100"
                      disabled={!validFrom()}
                    >
                      login
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
  );
}

export default Adminlogin;
