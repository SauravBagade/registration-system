import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function ChangePassword() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    oldPassword: "",
    newPassword: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
        await authService.changePassword(form);

      alert(
        res.data.message ||
        res.data ||
        "Password Changed Successfully"
      );

      navigate("/profile");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        err.response?.data ||
        "Password Change Failed"
      );
    }
  };

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2 className="mb-4">
          Change Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={form.oldPassword}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Change Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;