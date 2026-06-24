import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import adminService from "../services/adminService";

function UserDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    fetchUser();

  }, [id]);

  const fetchUser = async () => {

    try {

      const res =
        await adminService.getUserById(id);

      setUser(res.data);

    } catch (err) {

      console.log(err);

      alert(
        "Failed To Load User"
      );
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2>User Details</h2>

        <hr />

        <p>
          <b>ID:</b> {user.id}
        </p>

        <p>
          <b>Name:</b> {user.fullName}
        </p>

        <p>
          <b>Email:</b> {user.email}
        </p>

        <p>
          <b>Mobile:</b> {user.mobileNumber}
        </p>

        <p>
          <b>Role:</b> {user.role}
        </p>

        <p>
          <b>Verified:</b>{" "}
          {user.verified
            ? "Yes"
            : "No"}
        </p>

        <div className="mt-3">

          <button
            className="btn btn-secondary"
            onClick={() =>
              navigate("/admin/users")
            }
          >
            Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default UserDetails;