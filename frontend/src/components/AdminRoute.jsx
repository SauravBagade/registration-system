import { Navigate } from "react-router-dom";

import {
  getRole,
  getToken,
  isTokenExpired
} from "../utils/jwtUtils";

function AdminRoute({ children }) {

  const token = getToken();
  const role = getRole();

  if (!token || isTokenExpired()) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (role !== "ADMIN") {

    return (
      <Navigate
        to="/profile"
        replace
      />
    );
  }

  return children;
}

export default AdminRoute;