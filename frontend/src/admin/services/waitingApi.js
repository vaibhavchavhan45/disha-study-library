import axios from "axios";
import { getAdminToken } from "../utils/adminStorage";
import { urlConfig } from "../../config/urlConfig";

const waitingApi = axios.create({
  baseURL: urlConfig.apiWaitingUrl,
});

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getAdminToken()}` },
});

export const getWaitingListApi = async () => {
  const res = await waitingApi.get("/", authHeader());
  return res.data;
};

export const addWaitingStudentApi = async (data) => {
  const res = await waitingApi.post("/", data, authHeader());
  return res.data;
};

export const assignWaitingSeatApi = async (id, data) => {
  const res = await waitingApi.put(`/${id}/assign-seat`, data, authHeader());
  return res.data;
};

export const deleteWaitingStudentApi = async (id) => {
  const res = await waitingApi.delete(`/${id}`, authHeader());
  return res.data;
};

export const editWaitingStudentApi = async (id, data) => {
  const res = await axios.put(
    `${urlConfig.apiWaitingUrl}/${id}`,
    data,
    { headers: { Authorization: `Bearer ${getAdminToken()}` } }
  );
  return res.data;
};