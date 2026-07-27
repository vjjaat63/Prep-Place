import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  console.log("Axios Interceptor - Token from localStorage:", token); // DEBUG
  console.log("Axios Interceptor - Config headers before:", config.headers); // DEBUG
  
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  console.log("Axios Interceptor - Config headers after:", config.headers); // DEBUG
  return config;
});

export default axiosInstance;

