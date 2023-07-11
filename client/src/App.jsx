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
import AdminUsersPage from "./pages/admin/AdminUsersPage"
import AdminGuidesPage from "./pages/admin/AdminGuidesPage"
import AdminRegistrationsPage from "./pages/admin/AdminRegistrationsPage"
import AdminComplaintsPage from "./pages/admin/AdminComplaintsPage"
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import GuideRegisterPage from "./pages/guide/GuideRegisterPage";
import GuideLoginPage from "./pages/guide/GuideLoginPage";
import GuideHomePage from "./pages/guide/GuideHomePage";
import UserGuidesPage from "./pages/user/UserGuidesPage";
import GuidePackages from "./components/GuidePackages/GuidePackages";
import GuideBookings from "./components/GuideBookings/GuideBookings";
import GuideReviews from "./components/GuideReviews/GuideReviews";
import GuideAddPackage from "./components/GuideAddPackage/GuideAddPackage";
import GuideEditPackage from "./components/GuideEditPackage/GuideEditPackage";
import UserPackages from "./components/UserPackages/UserPackages";
import UserPackageDetails from "./components/UserPackageDetails/UserPackageDetails";
import UserEditProfile from "./components/UserEditProfile/UserEditProfile";

function App() {
  axios.defaults.baseURL = "http://localhost:2004/";
  axios.defaults.withCredentials = true;
  const { user, admin, guide ,refresh } = useSelector(
    (state) => {
      return state;
    }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("user/auth/check")
      dispatch({ type: "user", payload: { login: data.loggedIn, detials: data.user } })
      let { data:adminData } = await axios.get("/admin/auth/check")
      dispatch({ type: "admin", payload: { login: adminData.loggedIn, detials: adminData.admin } })
      let { data:guideData } = await axios.get("guide/auth/check")
      dispatch({ type: "guide", payload: { login: guideData.loggedIn, detials: guideData.guide } })
    })()
  }, [refresh])

  return (
    <div className="app">
      <Routes>

        {
          admin.login && 
          <>
          <Route path="/admin/dashboard" element={<AdminHomePage/>}/>
          <Route path="/admin/" element={<Navigate to="/admin/dashboard"/>}/>
          <Route path="/admin/users" element={<AdminUsersPage/>}/>
          <Route path="/admin/guides" element={<AdminGuidesPage/>}/>
          <Route path="/admin/registrations" element={<AdminRegistrationsPage/>}/>
          <Route path="/admin/complaints" element={<AdminComplaintsPage/>}/>
          <Route path="/admin/login" element={<Navigate to="/admin/dashboard"/>}/>
          </>
        }

        {
          admin.login === false &&
          <>
          <Route path="/admin/login" element={<AdminLoginPage/>}/>
          <Route path="/admin/dashboard" element={<Navigate to="/admin/login"/>}/>
          <Route path="/admin/" element={<Navigate to="/admin/login"/>}/>
          <Route path="/admin/users" element={<Navigate to="/admin/login"/>}/>
          <Route path="/admin/guides" element={<Navigate to="/admin/login"/>}/>
          <Route path="/admin/registrations" element={<Navigate to="/admin/login"/>}/>
          <Route path="/admin/complaints" element={<Navigate to="/admin/login"/>}/>
          </>
        }
        
        {
          user.login && 
          <>
            <Route path="/" element={<UserHomePage />} />
            <Route path="/edit-profile/:id" element={<UserEditProfile/>}/>
            <Route path="/guides" element={<UserGuidesPage />} />
            <Route path="/packages" element={<UserPackages />} />
            <Route path="/package-details/:id" element={<UserPackageDetails />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/sign-up" element={<Navigate to="/" />} />
          </>
        }

        {
          user.login == false &&
          <>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path='/guides' element={<Navigate to='/login'/>}/>
          <Route path='/packages' element={<Navigate to='/login'/>}/>
          <Route path='/package-details/:id' element={<Navigate to='/login'/>}/>
          <Route path='/edit-profile/:id' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<UserLoginpage/>} />
          <Route path='/sign-up' element={<UserSignupPage/>}/>
          <Route path="/forgot-password" element={<UserForgotPage/>}/>
          </>
        }

        {
          guide.login && 
          <>
          <Route path="/guide" element={<GuideHomePage/>}/>
          <Route path="/guide/packages" element={<GuidePackages/>}/>
          <Route path="/guide/add-package" element={<GuideAddPackage/>}/>
          <Route path="/guide/edit-package/:id" element={<GuideEditPackage/>}/>
          <Route path="/guide/bookings" element={<GuideBookings/>}/>
          <Route path="/guide/reviews" element={<GuideReviews/>}/>
          <Route path="/guide/login" element={<Navigate to="/guide"/>}/>
          <Route path="/guide/register" element={<Navigate to="/guide"/>}/>
          </>
        }

        {
          guide.login === false &&
          <>
          <Route path="/guide" element={<Navigate to="/guide/login"/>}/>
          <Route path="/guide/packages" element={<Navigate to="/guide/login"/>}/>
          <Route path="/guide/add-package" element={<Navigate to="/guide/login"/>}/>
          <Route path="/guide/edit-package" element={<Navigate to="/guide/login"/>}/>
          <Route path="/guide/bookings" element={<Navigate to="/guide/login"/>}/>
          <Route path="/guide/reviews" element={<Navigate to="/guide/login"/>}/>
          <Route path="/guide/login" element={<GuideLoginPage/>}/>
          <Route path="/guide/register" element={<GuideRegisterPage/>}/>
          </>
        }
        
      </Routes>
    </div>
  );
}

export default App;
