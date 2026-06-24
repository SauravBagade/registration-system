import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="container mt-5">

      <div className="card p-5 text-center">

        <h1>
          OTP Authentication System
        </h1>

        <p className="mt-3">
          Spring Boot + React + JWT + MySQL
        </p>

        <div className="mt-4">

          <Link
            to="/register"
            className="btn btn-primary me-2"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="btn btn-success"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;