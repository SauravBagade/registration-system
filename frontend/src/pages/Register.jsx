import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: ""
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
        await authService.register(form);

      alert(
        res.data.message ||
        "OTP Sent Successfully"
      );

      navigate("/verify-otp");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        err.response?.data ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2 className="mb-4">
          Register
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
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={form.mobileNumber}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Register
          </button>

        </form>

        <hr />

        <p className="text-center">

          Already Registered?

          <Link
            to="/login"
            className="ms-2"
          >
            Login Here
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;