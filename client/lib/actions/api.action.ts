import axios from "axios";

export const api = axios.create({
  baseURL: "https://ecommerce-swift-server.onrender.com/api",
  timeout: 5000,
  withCredentials: true,
});
