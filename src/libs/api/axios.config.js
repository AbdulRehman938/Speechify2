// src/libs/api/axios.config.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL, // This should be your backend's base URL
  headers: {
    Accept: "application/json",
    // 'Content-Type' will be set by specific requests (e.g., postRequest)
  },
});

// Add a request interceptor to include the authentication token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or wherever you store it after login)
    const token = localStorage.getItem('token'); // IMPORTANT: Use the exact key you use!

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified config
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor to handle 401 globally (your errorHandler already does this, but this is a common pattern)
axiosInstance.interceptors.response.use(
  (response) => response, // Just return the response if it's successful
  (error) => {
    // If the error response status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn('401 Unauthorized: Token might be expired or invalid. Attempting to log out.');
      // You can trigger a logout action here, e.g.:
      localStorage.removeItem('token'); // Clear the invalid token
      // window.location.href = '/login'; // Redirect to login page (consider using React Router's navigate)
      // Or dispatch a global logout action if you have a state management system
    }
    return Promise.reject(error); // Re-throw the error so your `errorHandler` in methods.js can still catch it
  }
);


export default axiosInstance;