import api from "./api";

const authService = {

  register(data) {
    return api.post(
      "/register",
      data
    );
  },

  verifyOtp(data) {
    return api.post(
      "/verify-otp",
      data
    );
  },

  login(data) {
    return api.post(
      "/login",
      data
    );
  },

  forgotPassword(data) {
    return api.post(
      "/forgot-password",
      data
    );
  },

  resetPassword(data) {
    return api.post(
      "/reset-password",
      data
    );
  },

  changePassword(data) {
    return api.post(
      "/change-password",
      data
    );
  },

  refreshToken(data) {
    return api.post(
      "/refresh-token",
      data
    );
  },

  logout(token) {
    return api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
  }

};

export default authService;
