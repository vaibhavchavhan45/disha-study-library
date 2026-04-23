import axios from "axios";
import { getAdminToken } from "../utils/adminStorage";
import { urlConfig } from "../../config/urlConfig";

const seatApi = axios.create({
  baseURL: urlConfig.apiSeatsUrl,
});

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getAdminToken()}` },
});

export const getSeatsApi = async (gender) => {
  const response = await seatApi.get("/", {
    params: { gender },
    ...authHeader(),
  });
  return response.data;
};

export const assignSeatApi = async (id, data) => {
  const response = await seatApi.put(`/${id}/assign`, data, authHeader());
  return response.data;
};

export const removeSeatApi = async (id) => {
  const response = await seatApi.put(`/${id}/remove`, {}, authHeader());
  return response.data;
};

export const replaceSeatApi = async (id, data) => {
  const response = await seatApi.put(`/${id}/replace`, data, authHeader());
  return response.data;
};

export const reserveSeatApi = async (id, data) => {
  const response = await seatApi.put(`/${id}/reserve`, data, authHeader());
  return response.data;
};

// Edit existing student's details without changing seat occupancy
export const editSeatApi = async (id, data) => {
  const response = await seatApi.put(`/${id}/edit`, data, authHeader());
  return response.data;
};