import loginImage from "../assets/imageSingin.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loading from "../components/Animation/Loading";
import SnackBar from "../components/Animation/SnackBar";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/v1/user/login",
          { email, password },
          config
        );

        //console.log(" log in status:", data.status);
        //console.log("User Data :", data.data.user);
        if (data.status === "success") {
          //console.log("Login successful");
          setShowSuccessAlert(true);
          setTimeout(() => setShowSuccessAlert(false), 1000); // Hide success alert after 3 seconds

          setTimeout(() => {
            navigate("/"); // Redirect to homepage
            window.location.reload(); // Reload the page
          }, 1000); // Show success alert for 2 seconds
        }
      } catch (error) {
        setLoginError(true);
        setTimeout(() => setLoginError(false), 2000);

        console.error("Error logging in:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  return (
    <>
      <div className="h-[90vh] items-center flex justify-center px-5 lg:px-0 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 text-center hidden md:flex">
            <div
              className=" w-full bg-cover bg-center bg-no-repeat"
              style={{
                //backgroundImage: `url(https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonscout.com%2Fillustrations%2Ffarmers&psig=AOvVaw3ijm_4WmPD6qg3PGl0Igka&ust=1731750265432000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDZtsaG3okDFQAAAAAdAAAAABAJ)`,
                backgroundImage: `url(${loginImage})`,
              }}
            ></div>
          </div>

          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <form onSubmit={handleSubmit}>
              <div className=" flex flex-col items-center">
                <div className="text-center">
                  <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                    Sign In
                  </h1>
                  <p className="text-[12px] text-gray-500">
                    Hey enter your details to Sign in into your account
                  </p>
                </div>
                <div className="w-full flex-1 mt-8">
                  <div className="mx-auto max-w-xs flex flex-col gap-4">
                    {/* <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Enter your name"
                  /> */}
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                    {errors?.email && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </div>
                    )}

                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                    />
                    {errors?.password && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </div>
                    )}
                    <p className=" text-xs text-gray-600 text-left">
                      <Link to="/forgetPassword">
                        <span className="text-blue-900 font-semibold">
                          {" "}
                          Forget Password?
                        </span>
                      </Link>
                    </p>
                    {loading ? (
                      <Loading />
                    ) : (
                      <button
                        className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="submit"
                      >
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3">Sign In</span>
                      </button>
                    )}
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Do not have an account?{" "}
                      <Link to="/signup">
                        <span className="text-blue-900 font-semibold">
                          Sing up
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              {loginError && (
                <SnackBar
                  message="Sign In failed. Please try again."
                  type="error"
                />
              )}
              {showSuccessAlert && (
                <SnackBar message="Signin successfull!" type="success" />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SigninPage;
