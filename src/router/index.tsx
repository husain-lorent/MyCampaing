import React, { useEffect } from "react";
import LoginPage from "pages/Login/LoginPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "pages/Signup/SignupPage";
import Layout from "components/Layout/Layot";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import HeroPage from "pages/Hero/HeroPage";

import Candidates from "pages/Main/Candidates/Candidates";
import SliderStatistic from "components/SliderStatistic/SliderStatistic";
import MainPage from "pages/Main/MainPage";

function RouterMain() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="example" element={<LoginPage />} />
            <Route index element={<MainPage />} />
            <Route path="hero" element={<HeroPage />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>}></Route>
      </Routes>
    </div>
  );
}

export default RouterMain;
