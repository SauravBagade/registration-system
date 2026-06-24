import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:8080/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
adminApi.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

const adminService = {

  getAllUsers() {
    return adminApi.get("/users");
  },

  getUserById(id) {
    return adminApi.get(
      `/user/${id}`
    );
  },

  deleteUser(id) {
    return adminApi.delete(
      `/user/${id}`
    );
  },

  getAnalytics() {
    return adminApi.get(
      "/analytics"
    );
  }

};

export default adminService;