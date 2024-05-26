import axios from "axios";
import { BASE_URL } from "../../constants";

// Create axios instance with custom configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Request timeout in milliseconds
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    // If token exists, set it in the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
