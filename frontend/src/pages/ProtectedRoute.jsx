import { Navigate }
from "react-router-dom";

import {
  getToken,
  isTokenExpired
}
from "../utils/jwtUtils";

function ProtectedRoute({
  children
}) {

  const token =
    getToken();

  if (
    !token ||
    isTokenExpired()
  ) {

    return (
      <Navigate
        to="/login"
      />
    );
  }

  return children;
}

export default ProtectedRoute;