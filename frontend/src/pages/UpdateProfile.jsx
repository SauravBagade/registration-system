import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../services/userService";
import Loader from "../components/Loader";

function UpdateProfile() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: ""
  });

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await userService.getProfile(
          token
        );

      setForm({
        fullName:
          res.data.fullName || "",
        mobileNumber:
          res.data.mobileNumber || ""
      });

    } catch (err) {

      console.log(err);

      alert(
        "Unable To Load Profile"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await userService.updateProfile(
        token,
        form
      );

      alert(
        "Profile Updated Successfully"
      );

      navigate("/profile");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Update Failed"
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2 className="mb-4">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={form.mobileNumber}
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default UpdateProfile;