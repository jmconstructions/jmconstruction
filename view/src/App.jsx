/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./page/HomePage";
import SigninPage from "./page/SigninPage";
import SignupPage from "./page/SingupPage";
import AllReportPage from "./page/AllReportPage";
import Dashboard from "./page/Dashboard";
import Chart from "./page/Chart";
import Allchart from "./page/overallchart";
import SiteReport from "./page/SiteReport";
import PdfReport from "./page/pdfreport";
import FormDesign from "./page/FormDesign";
import Logout from "./page/Logout";
import UserProfile from "./page/UserProfile";
import UpdatePasswordPage from "./page/UpdatePasswordPage";
import ForgetPasswordPage from "./components/ForgetPasswordPage";
import NotFound from "./page/NotFoundPage";
import useUserData from "./components/UserData";
import UserManagementPage from "./page/UserManagementPage";
import ReportManagement from "./page/ReportManagement";
import { useEffect, useState } from "react";
import Loader from "./assets/loading.gif";
import Loading from "./components/Animation/Loading";
import MainLoader from "./components/Animation/MainLoader";
import "./App.css";

/**
 * ProtectedRoute Component
 * Ensures the user is logged in to access the route.
 * If not logged in, redirects to the signin page.
 */
const ProtectedRoute = ({ userData, children }) => {
  return userData?.status === "success" ? children : <Navigate to="/signin" />;
};

/**
 * PublicRoute Component
 * Prevents logged-in users from accessing routes like signin or signup.
 * Redirects to the home page if already logged in.
 */
const PublicRoute = ({ userData, children }) => {
  return userData?.status === "success" ? <Navigate to="/" /> : children;
};

function App() {
  const { userData } = useUserData();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 500);
  }, []);

  return (
    <BrowserRouter>
      {/* {isLoading === true && (

        <MainLoader />
      )} */}
      <Navbar userData={userData} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        {userData.status === "success" ? (
          <>
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Dashboard userData={userData} />}>
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
            {/* <Route path="/pdf/:id" element={<PdfReport />} /> */}
          </>
        )}
        <Route path="/pdf/:id" element={<PdfReport />} />
        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
