import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Animation/Loading";
import SnackBar from "../components/Animation/SnackBar";

const UpdatePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    // Validate current password
    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    // Validate new password
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
      isValid = false;
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter";
      isValid = false;
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one number";
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

        const { data } = await axios.put(
          "/api/v1/user/updatepassword",
          {
            currentPassword,
            newPassword,
          },
          config
        );

        if (data.status === "success") {
          setShowSuccessAlert(true);
          setTimeout(() => setShowSuccessAlert(false), 2000);

          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        setUpdateError(true);
        setTimeout(() => setUpdateError(false), 2000);
        console.error("Error updating password:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-[70vh]  items-center flex justify-center px-5 ml-8 lg:px-0">
      <div className=" bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/3 xl:w-5/12 p-6 sm:p-12">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Update Password
                </h1>
                <p className="text-[12px] text-gray-500">
                  Please enter your current password and new password
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current Password"
                  />
                  {errors.currentPassword && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.currentPassword}
                    </div>
                  )}

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                  />
                  {errors.newPassword && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.newPassword}
                    </div>
                  )}

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                  />
                  {errors.confirmPassword && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
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
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="ml-3">Update Password</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {updateError && (
              <SnackBar
                message="Failed to update password. Please try again."
                type="error"
              />
            )}
            {showSuccessAlert && (
              <SnackBar
                message="Password updated successfully!"
                type="success"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
