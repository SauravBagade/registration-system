import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
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
        await authService.login(form);

      const token =
        res.data.data;

      localStorage.setItem(
        "token",
        token
      );

      const payload =
        JSON.parse(
          atob(token.split(".")[1])
        );

      localStorage.setItem(
        "role",
        payload.role
      );

      alert(
        "Login Successful"
      );

      navigate("/profile");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2 className="mb-4">
          Login
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
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="mb-3">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Login
          </button>

        </form>

        <hr />

        <p className="text-center">

          New User?

          <Link
            to="/register"
            className="ms-2"
          >
            Register Here
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;