import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 for authenticated requests, not login attempts
    const isLoginRequest = error.config?.url?.includes("/auth/admin/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      // Only redirect if not already on login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
