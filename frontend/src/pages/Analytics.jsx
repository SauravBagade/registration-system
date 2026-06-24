import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import adminService from "../services/adminService";

function Analytics() {

  const navigate = useNavigate();

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const res =
        await adminService.getAnalytics();

      setStats(res.data);

    } catch (err) {

      console.log(err);

      alert(
        "Failed To Load Analytics"
      );
    }
  };

  if (!stats) {
    return <Loader />;
  }

  return (

    <div className="container mt-5">

      <h2 className="mb-4">
        Analytics Dashboard
      </h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h5>Total Users</h5>
            <h3>{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h5>Verified Users</h5>
            <h3>{stats.verifiedUsers}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h5>Admin Users</h5>
            <h3>{stats.adminUsers}</h3>
          </div>
        </div>

      </div>

      <div className="mt-4">

        <button
          className="btn btn-secondary"
          onClick={() =>
            navigate("/admin")
          }
        >
          Back To Dashboard
        </button>

      </div>

    </div>
  );
}

export default Analytics;