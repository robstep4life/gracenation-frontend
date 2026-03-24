import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export const normalizeToken = (token) => {
  if (!token || typeof token !== "string") {
    return "";
  }

  const cleanedToken = token.replace(/^"|"$/g, "").trim();
  return cleanedToken.replace(/^Bearer\s+/i, "");
};

export const extractAuthToken = (payload = {}, headers = {}) => {
  const headerToken = headers.authorization || headers.Authorization || "";

  return normalizeToken(
    payload?.token ||
      payload?.accessToken ||
      payload?.jwt ||
      payload?.data?.token ||
      payload?.data?.accessToken ||
      headerToken
  );
};

export const getStoredToken = () => {
  const rawToken = localStorage.getItem("token");
  return normalizeToken(rawToken);
};

export const hasSessionAuth = () => localStorage.getItem("session_auth") === "true";

API.interceptors.request.use((config) => {
  const requestUrl = config.url || "";
  const isAuthRoute = requestUrl.includes("/auth/login");

  if (isAuthRoute) {
    return config;
  }

  const token = getStoredToken();

  if (token && !config.headers?.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;