// eslint-disable prettier/prettier
// import { header, errorHandler } from "./helpers";
import axios from "/src/libs/api/axios.config.js";
// import toastr from "toastr";

export const postRequest = async (url, data, params = {}) => {
  try {
    const response = await axios.post(url, data, params);
    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};
export const getRequest = async (
  url,
  params = {},
  header = { "Content-Type": "application/json", Accept: "*/*" }
) => {
  try {
    const response = await axios.get(url, {
      params,
      headers: header,
    });
    return response?.data;
  } catch (error) {
    // return errorHandler(error);
  }
};
export const putRequest = async (url, data, params = {}) => {
  try {
    const response = await axios.put(url, data, { params });
    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};
export const patchRequest = async (url, data, params = {}) => {
  try {
    const response = await axios.patch(url, data, { params });
    return response.data;
  } catch (error) {
    return errorHandler(error);
    console.log(error);
  }
};
export const deleteRequest = async (url, params = {}) => {
  try {
    const response = await axios.delete(url, { params });
    // console.log(response)
    return response?.data;
  } catch (error) {
    return errorHandler(error);
    console.log(error);
  }
};

export const errorHandler = (error) => {
  let message = "An unknown error occurred.";
  console.log(error.config.url);
  if (error.response) {
    const res = error.response.data;
    if (error.response.status === 401 && error.config.url != "Auth/login") {
      return { statusMessage: "Session expired. Please log in again." };
    }
    return res;
  }
  return { statusMessage: message };
};
