import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
        await authService.forgotPassword({
          email
        });

      alert(
        res.data.message ||
        res.data ||
        "OTP Sent Successfully"
      );

      navigate("/reset-password");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        err.response?.data ||
        "Request Failed"
      );
    }
  };

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2 className="mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <button
            className="btn btn-warning w-100"
            type="submit"
          >
            Send OTP
          </button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;