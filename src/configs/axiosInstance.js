import md5 from "md5";
import axios from "axios";
import { BASE_URL, PASSWORD } from "../constants";

const generateAuthString = () => {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  return md5(`${PASSWORD}_${timestamp}`);
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  mode: "no-cors",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["X-Auth"] = generateAuthString();

  return config;
});

export default axiosInstance;
