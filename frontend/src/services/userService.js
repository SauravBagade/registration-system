import api from "./api";

const userService = {

  getProfile() {
    return api.get(
      "/my-profile"
    );
  },

  updateProfile(data) {
    return api.put(
      "/update-profile",
      data
    );
  },

  deleteAccount() {
    return api.delete(
      "/delete-account"
    );
  },

  getAllUsers() {
    return api.get(
      "/admin/users"
    );
  },

  getUserById(userId) {
    return api.get(
      `/admin/users/${userId}`
    );
  },

  deleteUser(userId) {
    return api.delete(
      `/admin/users/${userId}`
    );
  }

};

export default userService;