/* eslint-disable no-unused-vars */

import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./components/Animation/Loading";
import useUserData from "./components/UserData";
import "./App.css";

// Lazy load pages
const HomePage = lazy(() => import("./page/HomePage"));
const SigninPage = lazy(() => import("./page/SigninPage"));
const SignupPage = lazy(() => import("./page/SingupPage"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const UserProfile = lazy(() => import("./page/UserProfile"));
const Chart = lazy(() => import("./page/Chart"));
const Allchart = lazy(() => import("./page/overallchart"));
const UserManagementPage = lazy(() => import("./page/UserManagementPage"));
const ReportManagement = lazy(() => import("./page/ReportManagement"));
const UpdatePasswordPage = lazy(() => import("./page/UpdatePasswordPage"));
const FormDesign = lazy(() => import("./page/FormDesign"));
const AllReportPage = lazy(() => import("./page/AllReportPage"));
const SiteReport = lazy(() => import("./page/SiteReport"));
const PdfReport = lazy(() => import("./page/pdfreport"));
const Logout = lazy(() => import("./page/Logout"));
const ForgetPasswordPage = lazy(() =>
  import("./components/ForgetPasswordPage")
);
const NotFound = lazy(() => import("./page/NotFoundPage"));

function App() {
  const { userData } = useUserData();

  return (
    <BrowserRouter>
      <Navbar userData={userData} />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          {userData.status === "success" ? (
            <>
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/profile"
                element={<Dashboard userData={userData} />}
              >
                <Route index element={<UserProfile userData={userData} />} />
                {(userData?.user?.role === "admin" ||
                  userData?.user?.role === "employee") && (
                  <>
                    <Route path="chart" element={<Chart />} />
                    <Route path="detailchart" element={<Allchart />} />
                    <Route
                      path="userManagement"
                      element={<UserManagementPage />}
                    />
                    <Route
                      path="reportManagement"
                      element={<ReportManagement />}
                    />
                    <Route
                      path="updatePassword"
                      element={<UpdatePasswordPage />}
                    />
                  </>
                )}
              </Route>
            </>
          ) : (
            <>
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
            </>
          )}

          {/* Protected Routes */}
          {(userData.user?.role === "admin" ||
            userData.user?.role === "employee") && (
            <>
              <Route
                path="/formdesign"
                element={<FormDesign userData={userData} />}
              />
              <Route path="/allReport" element={<AllReportPage />} />
              <Route path="/allReport/:id" element={<SiteReport />} />
            </>
          )}
          <Route path="/pdf/:id" element={<PdfReport />} />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
