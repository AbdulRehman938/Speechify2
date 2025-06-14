import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "/src/libs/api/methods.js";

// AUTH ENDPOINTS
export const AuthAPI = {
  register: async (body) => await postRequest(`auth/register`, body),
  verifyEmail: async (body) => await postRequest(`auth/verify-email`, body),
  resendOtp: async (body) => await postRequest(`auth/resend-otp`, body),
  login: async (body) => await postRequest(`auth/login`, body),
  forgotPassword: async (body) => await postRequest(`auth/forgot-password`, body),
  verifyOtp: async (body) => await postRequest(`auth/verify-otp`, body),
  resetPassword: async (body) => await postRequest(`auth/reset-password`, body),
};

// DATASETS ENDPOINTS
export const DatasetAPI = {
  addDataset: async (body) => await postRequest(`dataset/add-dataset`, body),
  viewDatasets: async () => await getRequest(`dataset/view-datasets`),
  viewDatasetByName: async (name) => await getRequest(`dataset/view-dataset/${name}`),
  deleteDataset: async (name) => await deleteRequest(`dataset/delete-dataset/${name}`),
  updateDataset: async (name, body) => await putRequest(`dataset/update-dataset/${name}`, body),
};

// IMAGES ENDPOINTS
export const ImageAPI = {
  uploadImage: async (body) => await postRequest(`img/upload-image`, body),
};

// LANGUAGES ENDPOINTS
export const LanguageAPI = {
  addLanguage: async (body) => await postRequest(`language/add-language`, body),
  getAllLanguages: async () => await getRequest(`language/view-languages`),
  getLanguageByName: async (name) => await getRequest(`language/view-language/${name}`),
  deleteLanguage: async (name) => await deleteRequest(`language/delete-language/${name}`),
  updateLanguage: async () => await putRequest(`language/update-language`, body),
};

// MODELS ENDPOINTS
export const ModelAPI = {
  addModel: async (body) => await postRequest(`model/add-model`, body),
  getAllModels: async () => await getRequest(`model/view-models`),
  getModel: async (name) => await getRequest(`model/view-model/${name}`),
  deleteModel: async (name) => await deleteRequest(`model/delete-model/${name}`),
  updateModel: async () => await putRequest(`model/update-model`, body),
};

// USER ENDPOINTS
export const UserAPI = {
  getTTSModels: async () => await getRequest(`users/profile`),
  updateProfile: async () => await putRequest(`users/profile`, body),
  getTTSModelsByName: async (name) => await getRequest(`users/get-tts-model/{}`),
};






