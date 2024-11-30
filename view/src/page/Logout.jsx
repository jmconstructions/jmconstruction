import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Animation/Loading";

// SnackBar component defined directly in the file
function SnackBar({ message, type }) {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div
      className={`${bgColor} py-2 px-4 rounded-md text-white text-center fixed bottom-4 right-4 flex gap-4`}
    >
      <p>{message}</p>
      <span
        className="cursor-pointer font-bold"
        onClick={(e) => e.target.parentNode.remove()}
      >
        <sup>X</sup>
      </span>
    </div>
  );
}

const Logout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const handleLogout = async () => {
      try {
        await axios.get("/api/v1/user/logout");

        if (isMounted) {
          setIsLoading(false);
          setShowNotification(true);

          // Wait for notification to show before redirecting
          setTimeout(() => {
            window.location.assign("/"); // This will reload the page
          }, 200);
        }
      } catch (error) {
        if (isMounted) {
          setIsLoading(false);
          setError(error.response?.data?.message || "Logout failed");
          setShowNotification(true);

          // Redirect to home even on error after showing message
          setTimeout(() => {
            window.location.assign("/"); // This will reload the page
          }, 200);
        }
      }
    };

    handleLogout();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading && <Loading />}

      {showNotification && !error && (
        <SnackBar message="Logged out successfully" type="success" />
      )}

      {showNotification && error && <SnackBar message={error} type="error" />}
    </div>
  );
};

export default Logout;
