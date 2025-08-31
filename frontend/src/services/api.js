import axios from "axios";

const API_BASE_URL = "https://khazaana-2v74-152lo8aid-coupons-projects-9dca61e5.vercel.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Admin Auth API
export const adminAuth = {
  signup: (data) => api.post("/admin/signup", data),
  verifyOTP: (data) => api.post("/admin/verify-otp", data),
  login: (data) => api.post("/admin/login", data),
  verifyLoginOTP: (data) => api.post("/admin/verify-login-otp", data),
  reset: (data) => api.post("/admin/reset-password", data),
  forgotPassword: (data) => api.post("/admin/forgot-password", data),
  verifyForgotPasswordOTP: (data) =>
    api.post("admin/verify-forgot-password-otp", data),
};

// Data API
export const dataAPI = {
  create: (data) => api.post("/data", data),
  getAll: () => api.get("/data"),
  update: (id, data) => api.put(`/data/${id}`, data),
  delete: (id) => api.delete(`/data/${id}`),
};

export default api;
