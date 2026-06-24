import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import userService from "../services/userService";
import authService from "../services/authService";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res =
        await userService.getProfile();

      setUser(res.data);

    } catch (err) {

      console.log(err);

      alert("Unable To Load Profile");
    }
  };

  const handleLogout = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await authService.logout(token);

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert("Logout Failed");
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (

    <div className="container mt-5">

      <div className="card p-4 profile-card">

        <h2 className="mb-4">
          My Profile
        </h2>

        <p>
          <strong>Name:</strong>{" "}
          {user.fullName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user.email}
        </p>

        <p>
          <strong>Mobile:</strong>{" "}
          {user.mobileNumber}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user.role}
        </p>

        <div className="mt-4">

          <button
            className="btn btn-warning me-2"
            onClick={() =>
              navigate("/update-profile")
            }
          >
            Update Profile
          </button>

          <button
            className="btn btn-info me-2"
            onClick={() =>
              navigate("/change-password")
            }
          >
            Change Password
          </button>

          <button
            className="btn btn-danger me-2"
            onClick={handleLogout}
          >
            Logout
          </button>

          {user.role === "ADMIN" && (

            <button
              className="btn btn-dark"
              onClick={() =>
                navigate("/admin")
              }
            >
              Admin Dashboard
            </button>

          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;