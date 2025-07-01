import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
} from "/src/libs/api/methods.js";

// AUTH ENDPOINTS
export const AuthAPI = {
  register: async (body) => await postRequest(`auth/register`, body),
  verifyEmail: async (body) => await postRequest(`auth/verify-email`, body),
  resendOtp: async (body) => await postRequest(`auth/resend-otp`, body),
  login: async (body) => await postRequest(`auth/login`, body),
  forgotPassword: async (body) =>
    await postRequest(`auth/forgot-password`, body),
  verifyOtp: async (body) => await postRequest(`auth/verify-otp`, body),
  resetPassword: async (body) => await postRequest(`auth/reset-password`, body),
};

// DATASETS ENDPOINTS
export const DatasetAPI = {
  addDataset: async (body) => await postRequest(`dataset/add-dataset`, body),
  viewDatasets: async () => await getRequest(`dataset/view-datasets`),
  viewDatasetByName: async (name) =>
    await getRequest(`dataset/view-dataset/${name}`),
  deleteDataset: async (name) =>
    await deleteRequest(`dataset/delete-dataset/${name}`),
  updateDataset: async (name, body) =>
    await putRequest(`dataset/update-dataset/${name}`, body),
};

// IMAGES ENDPOINTS
export const ImageAPI = {
  uploadImage: async (body) => await postRequest(`img/upload-image`, body),
};

// LANGUAGES ENDPOINTS
export const LanguageAPI = {
  addLanguage: async (body) => await postRequest(`language/add-language`, body),
  getAllLanguages: async () => await getRequest(`language/view-languages`),
  getLanguageByName: async (name) =>
    await getRequest(`language/view-language/${name}`),
  deleteLanguage: async (name) =>
    await deleteRequest(`language/delete-language/${name}`),
  updateLanguage: async (body) =>
    await putRequest(`language/update-language`, body),
};

// MODELS ENDPOINTS
export const ModelAPI = {
  addModel: async (body) => await postRequest(`model/add-model`, body),
  getAllModels: async () => await getRequest(`model/view-models`),
  getModel: async (name) => await getRequest(`model/view-model/${name}`),
  deleteModel: async (name) =>
    await deleteRequest(`model/delete-model/${name}`),
  updateModel: async (body) => await putRequest(`model/update-model`, body),
};

// USER ENDPOINTS (Updated with all management endpoints)
export const UserAPI = {
  // Profile Management
  viewUsers: async () => await getRequest(`users/profile`),
  updateProfile: async (body) => await putRequest(`users/profile`, body),
  getTTSModelsByName: async (name) =>
    await getRequest(`users/get-tts-model/${name}`),

  // User Management
  getAllUsers: async () => await getRequest(`users`),
  getUserById: async (userId) => await getRequest(`users/${userId}`),
  createUser: async (body) => await postRequest(`users`, body),
  updateUser: async (userId, body) => await putRequest(`users/${userId}`, body),
  deleteUser: async (userId) => await deleteRequest(`users/${userId}`),

  // Role Management
  assignRole: async (userId, role) =>
    await patchRequest(`users/${userId}/role`, { role }),
  getAllRoles: async () => await getRequest(`users/roles`),

  // Status Management
  deactivateUser: async (userId) =>
    await patchRequest(`users/${userId}/deactivate`),
  activateUser: async (userId) =>
    await patchRequest(`users/${userId}/activate`),

  // Search/Filter
  searchUsers: async (query) =>
    await getRequest(`users/search?query=${encodeURIComponent(query)}`),
  filterUsers: async (filters) =>
    await getRequest(`users/filter?${new URLSearchParams(filters).toString()}`),


  // TTS (Text to Speech) Generation
generateTTS: async (body) =>
  await postRequest(`users/synthesis-text-to-speech`, body),

getTTSStatus: async (taskId) =>
  await getRequest(`users/get-status/${taskId}`),

// ✅ Aliases for compatibility with frontend naming
synthesizeText: async (body) => await UserAPI.generateTTS(body),
getSpeechStatus: async (taskId) => await UserAPI.getTTSStatus(taskId),

};
