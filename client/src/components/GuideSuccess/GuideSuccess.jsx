import React from "react";
import { Link } from "react-router-dom";

function GuideSuccess() {
  return (
    <div>
      <h1>Guide Registration Success!</h1>
      <h4>
        A mail will sent to your email acount with a password , if your
        registration accepted by admin
      </h4>
      <h5>you can login with those password , and change it if you want</h5>
      <div className="login-row mt-3">
        <Link to="/guide/login">Go to login page</Link>
      </div>
    </div>
  );
}

export default GuideSuccess;
