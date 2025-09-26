import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // ✅ helps send cookies if you use them
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    // Request interceptor → add token
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token"); // store token after login
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor → handle 401/403
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logOut();
        }
        return Promise.reject(error);
      }
    );
  }, [logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
