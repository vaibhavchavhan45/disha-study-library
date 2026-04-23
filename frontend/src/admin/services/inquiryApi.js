import axios from "axios";
import { getAdminToken } from "../utils/adminStorage";
import { urlConfig } from "../../config/urlConfig.js";

const inquiryApi = axios.create({
  baseURL: urlConfig.apiInquiriesUrl
});

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getAdminToken()}` },
});

export const getInquiriesApi = async () => {
  const res = await inquiryApi.get("/", authHeader());
  return res.data;
};

export const moveInquiryToWaitingApi = async (id) => {
  const res = await inquiryApi.put(`/${id}/move`, {}, authHeader());
  return res.data;
};