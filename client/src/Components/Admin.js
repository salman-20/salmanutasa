import React, { useState, useEffect } from "react";
import "./Mystyle.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser, updateUser } from "../Features/AdminSlice";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.admin.users);
  const email = useSelector((state) => state.users.user.email);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleUpdate = (user) => {
    navigate(`/updateUser`, { state: { user } });
  };

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (!email) {
      navigate("/Login");
    }
  }, [email]);
  return (
    <div>
      <div>
        <h4 className="cor">Admin Control</h4>
      </div>
      <div style={{ display: "flex" }}>
        <input
          className="input1"
          id="searchInput"
          type="text"
          placeholder="Search User Name"
          onChange={(s) => setSearch(s.target.value)}
        />
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Data of Birth</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                search === "" ? true : user.email.includes(search)
              )
              .map((user) => (
                <tr key={user._id}>
                  <td>
                    <input
                      className="input2"
                      type="text"
                      defaultValue={user.name}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      className="input2"
                      type="text"
                      defaultValue={user.email}
                      disabled
                    />
                  </td>

                  <td>
                    <input
                      className="input2"
                      type="date"
                      defaultValue={user.datebirth}
                      disabled
                    />
                  </td>
                  <td>
                    <button
                      className="submit1"
                      onClick={() => handleDelete(user.email)}
                    >
                      Delete
                    </button>
                    <button
                      className="submit1"
                      onClick={() => handleUpdate(user)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="div2"></div>
      </div>
      <div className="div3"></div>
    </div>
  );
};

export default Admin;
