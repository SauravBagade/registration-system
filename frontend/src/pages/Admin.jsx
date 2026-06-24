import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Admin() {

  const navigate = useNavigate();

  const [stats, setStats] = useState(null);

  useEffect(() => {

    setTimeout(() => {

      setStats({
        totalUsers: 25,
        verifiedUsers: 20,
        adminUsers: 2
      });

    }, 500);

  }, []);

  if (!stats) {
    return <Loader />;
  }

  return (

    <div className="container mt-5">

      <h2 className="mb-4">
        Admin Dashboard
      </h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h4>Total Users</h4>
            <h2>{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h4>Verified Users</h4>
            <h2>{stats.verifiedUsers}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h4>Admin Users</h4>
            <h2>{stats.adminUsers}</h2>
          </div>
        </div>

      </div>

      <div className="mt-5">

        <button
          className="btn btn-primary me-2"
          onClick={() =>
            navigate("/admin/users")
          }
        >
          Manage Users
        </button>

        <button
          className="btn btn-info me-2"
          onClick={() =>
            navigate("/admin/analytics")
          }
        >
          Analytics
        </button>

        <button
          className="btn btn-success"
          onClick={() =>
            navigate("/profile")
          }
        >
          Back To Profile
        </button>

      </div>

    </div>
  );
}

export default Admin;