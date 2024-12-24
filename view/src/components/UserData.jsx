/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../lib/axios";
//import Cookies from "js-cookie";

const useUserData = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/user");
        console.log("repsonse", response.data);
        setUserData(response.data);

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, isLoading, error };
};

export default useUserData;
