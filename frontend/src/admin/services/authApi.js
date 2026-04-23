import axios from "axios";
import { urlConfig } from "../../config/urlConfig";

const authApi = axios.create({
  baseURL: urlConfig.apiAuthUrl,
});

export const loginAdminApi = async (data) => {
  const response = await authApi.post("/login", data);
  return response.data;
};

export const verifyAdminOtpApi = async (data) => {
  const response = await authApi.post("/verify-otp", data);
  return response.data;
};

export const forgotPasswordApi = async (data) => {
  const response = await authApi.post("/forgot-password", data);
  return response.data;
};

export const resetPasswordApi = async (data) => {
  const response = await authApi.post("/reset-password", data);
  return response.data;
};

export const changePasswordApi = async (data, jwtToken) => {
  const response = await authApi.post("/change-password", data, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
  return response.data;
};

export const getProfileApi = async (jwtToken) => {
  const response = await authApi.get("/profile", {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
  return response.data;
};

export const updateProfileApi = async (data, jwtToken) => {
  const response = await authApi.put("/profile", data, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
  return response.data;
};