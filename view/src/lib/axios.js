import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/v1",
  // import.meta.env.MODE === "development"
  //   ? "http://localhost:3000/api/v1":

  withCredentials: true,
});
