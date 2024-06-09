import axios from "axios";

const BASE_URL = "https://moneyfulpublicpolicy.co.kr";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      // Add additional logic to refresh token if needed
      // You can implement a function to handle token refresh here
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
