import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== "undefined") {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Hatası:", error?.response?.data || error?.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
