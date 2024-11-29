/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  X,
  Save,
  Loader,
  Camera,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const UserProfile = ({ userData }) => {
  // Initialize state with userData if available
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
  });

  // Separate loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Notification states
  const [notification, setNotification] = useState({
    type: "", // 'success' or 'error'
    message: "",
  });

  // Effect to load initial data
  useEffect(() => {
    const initializeData = async () => {
      // If userData is provided and complete, use it
      if (userData?.user?.name && userData?.user?.email) {
        setFormData({
          name: userData.user.name,
          email: userData.user.email,
          photo: userData.user.photo || null,
        });
        setIsLoading(false);
        return;
      }

      // Otherwise fetch from API
      try {
        const response = await fetch("http://localhost:5173/api/v1/user/user");
        const data = await response.json();

        if (data.user) {
          setFormData({
            name: data.user.name,
            email: data.user.email,
            photo: data.user.photo || null,
          });
        }
      } catch (error) {
        setNotification({
          type: "error",
          message: "Failed to load profile data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear notifications when user starts editing
    setNotification({ type: "", message: "" });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setNotification({
        type: "error",
        message: "Image must be smaller than 5MB",
      });
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to process image",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setNotification({ type: "", message: "" });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);

      // Handle photo upload
      if (formData.photo && formData.photo.startsWith("data:image")) {
        const response = await fetch(formData.photo);
        const blob = await response.blob();
        formDataToSend.append("photo", blob, "profile.jpg");
      }

      const response = await fetch("/api/v1/user/updateme", {
        method: "PATCH",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        ...data.data.user,
      }));

      setNotification({
        type: "success",
        message: "Profile updated successfully",
      });

      // Close edit mode after short delay
      setTimeout(() => setIsEditing(false), 1500);
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message || "Failed to update profile",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-white rounded-lg border">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border">
      {/* Header */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Profile Information
        </h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setNotification({ type: "", message: "" });
          }}
          disabled={isUpdating}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      {/* Notification Banner */}
      {notification.message && (
        <div
          className={`px-4 py-3 flex items-center gap-2 ${
            notification.type === "error"
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {notification.type === "error" ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <CheckCircle className="h-5 w-5" />
          )}
          <p>{notification.message}</p>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          {/* Profile Image Section */}
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={formData.photo || "/api/placeholder/112/112"}
                  alt="Profile"
                  className="h-28 w-28 rounded-full object-cover border-4 border-indigo-600"
                />
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUpdating}
                  />
                  <Camera className="h-4 w-4" />
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isUpdating}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isUpdating}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setNotification({ type: "", message: "" });
                }}
                disabled={isUpdating}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
              >
                {isUpdating ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          {/* View Mode */}
          <header className="px-2 py-4 flex flex-col justify-center items-center text-center">
            <img
              className="inline-flex object-cover border-4 border-indigo-600 rounded-full h-48 w-48"
              src={formData.photo || "/api/placeholder/192/192"}
              alt={formData.name}
            />
            <h1 className="text-2xl text-gray-500 font-bold mt-2">
              {formData.name}
            </h1>
            <h2 className="text-base md:text-xl text-gray-500 font-bold">
              Civil Engineer
            </h2>
          </header>

          <div className="border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formData.name}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formData.email}
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
