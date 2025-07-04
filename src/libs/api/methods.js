// src/libs/api/methods.js
import axios from "/src/libs/api/axios.config.js";

/**
 * Universal error handler for Axios responses.
 * Ensures a consistent error object structure.
 * @param {object} error - The Axios error object.
 * @returns {object} An object containing error details (data, status, statusMessage).
 */
export const errorHandler = (error) => {
  let message = "An unknown error occurred.";
  let status = 500; // Default status for unknown errors
  let data = null; // Default for error data

  // Check if the error has a response from the server
  if (error.response) {
    status = error.response.status;
    data = error.response.data; // Get the error data from the backend

    // Specific handling for 401 Unauthorized errors
    // Note: Changed "Auth/login" to "auth/login" for potential case sensitivity
    if (status === 401 && error.config.url !== "auth/login") {
      message = "Session expired. Please log in again.";
    } else {
      // Try to get a more specific message from the backend response
      message =
        data.message ||
        data.error ||
        data.errors?.[0]?.msg ||
        error.response.statusText ||
        message;
    }
  } else if (error.request) {
    // The request was made but no response was received
    message = "No response from server. Please check your network connection.";
    status = 0; // Indicate no HTTP status received
  } else {
    // Something happened in setting up the request that triggered an Error
    message = error.message;
    status = 0; // Indicate no HTTP status received
  }

  // Return a consistent error object
  return {
    data: data, // Backend's error data
    status: status, // HTTP status code or 0 for network/setup errors
    statusMessage: message, // User-friendly error message
  };
};

/**
 * Handles POST requests.
 * @param {string} url - The API endpoint URL.
 * @param {object} data - The request body data.
 * @param {object} params - Optional request parameters.
 * @returns {Promise<object>} A promise that resolves to { data, status } or rejects with an error object.
 */
export const postRequest = async (url, data, params = {}) => {
  try {
    const response = await axios.post(url, data, params);
    // Return an object containing both data and status for successful responses
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Handles GET requests.
 * @param {string} url - The API endpoint URL.
 * @param {object} params - Optional query parameters.
 * @param {object} header - Optional custom headers.
 * @returns {Promise<object>} A promise that resolves to { data, status } or rejects with an error object.
 */
export const getRequest = async (
  url,
  params = {},
  header = { "Content-Type": "application/json", Accept: "*/*" }
) => {
  try {
    const response = await axios.get(url, {
      params,
    });
    // Return an object containing both data and status for successful responses
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Handles PUT requests.
 * @param {string} url - The API endpoint URL.
 * @param {object} data - The request body data.
 * @param {object} params - Optional request parameters.
 * @returns {Promise<object>} A promise that resolves to { data, status } or rejects with an error object.
 */
export const putRequest = async (url, data, params = {}) => {
  try {
    const response = await axios.put(url, data, { params });
    // Return an object containing both data and status for successful responses
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Handles PATCH requests.
 * @param {string} url - The API endpoint URL.
 * @param {object} data - The request body data.
 * @param {object} params - Optional request parameters.
 * @returns {Promise<object>} A promise that resolves to { data, status } or rejects with an error object.
 */
export const patchRequest = async (url, data, params = {}) => {
  try {
    const response = await axios.patch(url, data, { params });
    // Return an object containing both data and status for successful responses
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Handles DELETE requests.
 * @param {string} url - The API endpoint URL.
 * @param {object} params - Optional query parameters.
 * @returns {Promise<object>} A promise that resolves to { data, status } or rejects with an error object.
 */
export const deleteRequest = async (url, params = {}) => {
  try {
    const response = await axios.delete(url, { params });
    // Return an object containing both data and status for successful responses
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return errorHandler(error);
  }
};
