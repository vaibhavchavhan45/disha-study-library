export const ADMIN_TOKEN_KEY = "admin_token";
export const ADMIN_USER_KEY = "admin_user";

export const setAdminToken = (token) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const getAdminToken = () => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const removeAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const setAdminUser = (admin) => {
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
};

export const getAdminUser = () => {
  const admin = localStorage.getItem(ADMIN_USER_KEY);
  return admin ? JSON.parse(admin) : null;
};

export const removeAdminUser = () => {
  localStorage.removeItem(ADMIN_USER_KEY);
};

export const clearAdminAuth = () => {
  removeAdminToken();
  removeAdminUser();
};