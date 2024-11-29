import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Animation/Loading";
import SnackBar from "../components/Animation/SnackBar";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [resetError, setResetError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
    };

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

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
          "/api/v1/user/forget-password",
          { email },
          config
        );

        if (data.status === "success") {
          setShowSuccessAlert(true);
          setTimeout(() => setShowSuccessAlert(false), 2000);

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        setResetError(true);
        setTimeout(() => setResetError(false), 2000);
        console.error("Error requesting password reset:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Forgot Password?
                </h1>
                <p className="text-[12px] text-gray-500">
                  Enter your email address to reset your password
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </div>
                  )}

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
                        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="ml-3">Reset Password</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {resetError && (
              <SnackBar
                message="Failed to send reset email. Please try again."
                type="error"
              />
            )}
            {showSuccessAlert && (
              <SnackBar
                message="Password reset email sent successfully!"
                type="success"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
