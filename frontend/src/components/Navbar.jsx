import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/login");
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
        >
          OTP Auth System
        </Link>

        <div>

          {!token ? (

            <>

              <Link
                className="btn btn-outline-light me-2"
                to="/register"
              >
                Register
              </Link>

              <Link
                className="btn btn-success"
                to="/login"
              >
                Login
              </Link>

            </>

          ) : (

            <>

              <Link
                className="btn btn-primary me-2"
                to="/profile"
              >
                Profile
              </Link>

              <Link
                className="btn btn-warning me-2"
                to="/update-profile"
              >
                Update Profile
              </Link>

              <Link
                className="btn btn-info me-2"
                to="/change-password"
              >
                Change Password
              </Link>

              <Link
                className="btn btn-danger me-2"
                to="/delete-account"
              >
                Delete Account
              </Link>

              {role === "ADMIN" && (

                <Link
                  className="btn btn-dark me-2"
                  to="/admin"
                >
                  Admin
                </Link>

              )}

              <button
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>

            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;