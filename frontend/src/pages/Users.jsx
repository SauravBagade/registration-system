import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import adminService from "../services/adminService";
import Loader from "../components/Loader";

function Users() {

  const navigate = useNavigate();

  const [users, setUsers] = useState(null);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const res =
        await adminService.getAllUsers();

      setUsers(res.data);

    } catch (err) {

      console.log(err);

      alert("Failed To Load Users");
    }
  };

  const deleteUser = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete User?"
      );

    if (!confirmDelete) return;

    try {

      await adminService.deleteUser(id);

      setUsers(
        users.filter(
          (user) => user.id !== id
        )
      );

      alert(
        "User Deleted Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Delete Failed"
      );
    }
  };

  if (!users) {
    return <Loader />;
  }

  return (

    <div className="container mt-5">

      <h2>User Management</h2>

      <table className="table table-bordered mt-4">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>

              <td>{user.fullName}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>
                {user.verified
                  ? "Yes"
                  : "No"}
              </td>

              <td>

                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() =>
                    navigate(
                      `/admin/user/${user.id}`
                    )
                  }
                >
                  View
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteUser(user.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Users;
