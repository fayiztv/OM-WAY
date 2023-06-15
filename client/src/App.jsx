import React, { useEffect, useState } from "react";
import UserSignupPage from "./pages/user/UserSignupPage";
import { Navigate, Route, Routes } from "react-router-dom";
import UserLoginpage from "./pages/user/UserLoginpage";
import UserHomePage from "./pages/user/UserHomePage";
import "./App.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UserForgotPage from "./pages/user/UserForgotPage";
import AdminHomePage from "./pages/admin/AdminHomePage"
import AdminLoginPage from "./pages/admin/AdminLoginPage";

function App() {
  axios.defaults.baseURL = "http://localhost:2000/";
  axios.defaults.withCredentials = true;
  const { user, admin, refresh, serviceCenter, worker } = useSelector(
    (state) => {
      return state;
    }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("user/auth/check")
      dispatch({ type: "user", payload: { login: data.loggedIn, detials: data.user } })
      let {data:adminData} = await axios.get("/admin/auth/check")
      dispatch({ type: "admin", payload: { login: adminData.loggedIn, detials: adminData.admin } })
    })()
  }, [refresh])

  return (
    <div className="app">
      <Routes>

        {
          admin.login && 
          <>
          <Route path="/admin/" element={<AdminHomePage/>}/>
          <Route path="/admin/login" element={<Navigate to="/admin/"/>}/>
          </>
        }

        {
          admin.login === false &&
          <>
          <Route path="/admin/login" element={<AdminLoginPage/>}/>
          <Route path="/admin/" element={<Navigate to="/admin/login"/>}/>
          </>
        }
        
        {
          user.login && 
          <>
            <Route path="/" element={<UserHomePage />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/sign-up" element={<Navigate to="/" />} />
          </>
        }

        {
          user.login == false &&
          <>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<UserLoginpage/>} />
          <Route path='/sign-up' element={<UserSignupPage/>}/>
          <Route path="/forgot" element={<UserForgotPage/>}/>
          </>
        }

        <Route path="/admin/login" element={<AdminHomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
