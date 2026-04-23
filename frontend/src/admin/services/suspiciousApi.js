import axios from "axios";
import { urlConfig } from "../../config/urlConfig.js";

const suspiciousApi = axios.create({
  baseURL: urlConfig.apiSuspiciousUrl,
});

export const reportSuspiciousLogin = async (data) => {
  const response = await suspiciousApi.post("/report-suspicious", data);
  return response.data;
};