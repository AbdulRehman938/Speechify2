import axios from "axios";

export function configureHeaders() {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
}

export function configureInterceptors() {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.status === 401 || error?.status === 498) {
        console.log("Token expired or invalid, clearing token...", error);

        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        localStorage.removeItem("loglevel");
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
      }
      return Promise.reject(error);
    }
  );
}