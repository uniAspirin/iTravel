import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

api.interceptors.request.use(
  (config) => {
    config.headers.Accept = "application/json";
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // some logic to navigate to login page
      window.location.href = "/login";
    }
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    Swal.fire({
      icon: "error",
      title: "Api",
      text: message,
      showConfirmButton: false,
      timer: 1500,
    });
    return Promise.reject(error);
  },
);
