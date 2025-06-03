import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Mystyle.css";
import { updateUser } from "../Features/AdminSlice";
import { useDispatch, useSelector } from "react-redux";

const UpdateUser = () => {
  
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const user = email === "Admin@gmail.com" ? location.state?.user : null;

  const [name, setName] = useState(user ? user.name : "");
  const [newEmail, setnewEmail] = useState(user ? user.email : "");
  const [datebirth, setDatebirth] = useState(user ? user.datebirth : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = {
      name,
      newEmail: newEmail,
      datebirth,
    };
    dispatch(updateUser({ email: user.email, updatedFields }));
    navigate("/Home");
  };
  useEffect(() => {
    if (!email) {
      navigate("/Login");
    }
  }, [email]);
  return (
    <div>
      <h4 className="cor">Update User</h4>
      <div class="register">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              className="input2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              className="input2"
              type="email"
              value={newEmail}
              onChange={(e) => setnewEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              className="input2"
              type="date"
              value={datebirth}
              onChange={(e) => setDatebirth(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="submit1">
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
