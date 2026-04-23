import axios from "axios";
import { getAdminToken } from "../utils/adminStorage";
import { urlConfig } from "../../config/urlConfig";

const dashboardApi = axios.create({
  baseURL: urlConfig.apiDashboardUrl,
});

export const getDashboardStatsApi = async () => {
  const token = getAdminToken();

  const response = await dashboardApi.get("/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};