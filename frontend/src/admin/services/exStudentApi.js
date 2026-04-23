import axios from "axios";
import { getAdminToken } from "../utils/adminStorage";
import { urlConfig } from "../../config/urlConfig";

export const getExStudentsApi = async () => {
  const res = await axios.get(urlConfig.apiExStudentsUrl, {
    headers: { Authorization: `Bearer ${getAdminToken()}` },
  });
  return res.data;
};