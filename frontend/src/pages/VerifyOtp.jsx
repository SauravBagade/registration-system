import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function VerifyOtp() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    otp: ""
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
        await authService.verifyOtp(form);

      alert(
        res.data.message ||
        "OTP Verified Successfully"
      );

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        err.response?.data ||
        "OTP Verification Failed"
      );
    }
  };

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2 className="mb-4">
          Verify OTP
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
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Verify OTP
          </button>

        </form>

      </div>

    </div>
  );
}

export default VerifyOtp;