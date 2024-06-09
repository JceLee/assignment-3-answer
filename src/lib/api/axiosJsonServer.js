import axios from "axios";

const BASE_URL = "https://bottlenose-slime-juniper.glitch.me";

const axiosJsonServerInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosJsonServerInstance;
