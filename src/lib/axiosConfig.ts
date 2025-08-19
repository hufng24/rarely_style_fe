// src/utils/axiosConfig.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Tạo instance axios
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // base url API
  timeout: 100000, // timeout 10s
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response.data, // chỉ trả về data
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirect to login.");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
