// libs/config/axios.config.js
import axios from "axios";

// Set base URL from .env
axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

// Optional: set default headers
axios.defaults.headers.common["Accept"] = "application/json";

export default axios;
