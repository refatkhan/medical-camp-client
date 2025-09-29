// src/hooks/useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", // your backend URL
});

// Request interceptor to add JWT automatically
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or "access-token"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin"; // redirect to login
    }
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
