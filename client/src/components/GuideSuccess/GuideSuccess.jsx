import React from 'react'
import { Link } from "react-router-dom";

function GuideSuccess() {
  return (
    <div>
        <h1>Guide Registration Success!</h1>
        <div className="login-row mt-3">
            <Link to="/login">Go to login page</Link>
        </div>
    </div>
  )
}

export default GuideSuccess