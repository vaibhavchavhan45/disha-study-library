import { Navigate } from "react-router-dom";
import { getAdminToken } from "../utils/adminStorage";

const ProtectedAdminRoute = ({ children }) => {
  const token = getAdminToken();

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;