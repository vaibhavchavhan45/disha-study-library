import { config } from "./config.js";

export const urlConfig = {
  cloudinaryUploadUrl: `https://api.cloudinary.com/v1_1/${config.cloudinary_cloud_name}/image/upload`,
  apiAuthUrl: `${config.vite_api_url}/api/auth`,
  apiDashboardUrl: `${config.vite_api_url}/api/dashboard`,
  apiInquiriesUrl: `${config.vite_api_url}/api/inquiries`,
  apiWaitingUrl: `${config.vite_api_url}/api/waiting`,
  apiSeatsUrl: `${config.vite_api_url}/api/seats`,
  apiExStudentsUrl: `${config.vite_api_url}/api/ex-students`,
  apiSuspiciousUrl: `${config.vite_api_url}/api/auth`
};