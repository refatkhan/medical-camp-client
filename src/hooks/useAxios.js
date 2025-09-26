import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // ✅ set your API base url in .env
  });

  return axiosInstance;
};

export default useAxios;
