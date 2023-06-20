import React from "react";
import { Link } from "react-router-dom";

function GuideSuccess() {
  return (
    <div style={{display:'flex',flexDirection:'column ',height:'60vh',width:'80vw',justifyContent:"center",alignItems:'center'}}>
      <h1>Guide Registration Success!</h1>
      <h4>
        A mail will sent to your email acount if you registration are accepted or not
      </h4>
      <h5>have a nice day</h5>
      <div className="login-row mt-3">
        <Link to="/guide/login">Go to login page</Link>
      </div>
    </div>
  );
}

export default GuideSuccess;
