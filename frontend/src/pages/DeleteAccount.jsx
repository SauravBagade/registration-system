import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

function DeleteAccount() {

  const navigate = useNavigate();

  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete your account?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const token =
        localStorage.getItem("token");

      await userService.deleteAccount(
        token
      );

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "role"
      );

      alert(
        "Account Deleted Successfully"
      );

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed To Delete Account"
      );
    }
  };

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2 className="mb-3">
          Delete Account
        </h2>

        <p className="text-danger">

          This action cannot be undone.

        </p>

        <button
          className="btn btn-danger w-100"
          onClick={handleDelete}
        >
          Delete My Account
        </button>

      </div>

    </div>
  );
}

export default DeleteAccount;