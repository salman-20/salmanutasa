import React, { useState } from "react";
import "./Mystyle.css";
import utasa from "../Images/utasa.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../Features/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const picURL = user.email
    ? `http://localhost:4001/uploads/${user.profilePic}`
    : null;

  const handleLogout = async () => {
    dispatch(logoutUser());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/Login");
  };

  return (
    <div>
      <nav className="navbar">
        <h2>
          <div className="logo-container">
            {!user.email ? (
              <img src={utasa} alt="logo" className="logo" />
            ) : (
              <Link to="/Profile">
                <img src={picURL} alt="profile logo" className="logo" />
              </Link>
            )}
          </div>
        </h2>
        {!user.email ? (
          <div className="nav-items">
            <h2>
              <Link to="/" className="n-item">
                REGISTER
              </Link>
            </h2>
            <h2>
              <Link to="/Login" className="n-item">
                LOGIN
              </Link>
            </h2>
            <h2>
              <Link to="/Password" className="n-item">
                PASSWORD
              </Link>
            </h2>
          </div>
        ) : null}

        {user.email ? (
          <div className="nav-items">
            <h2>
              <Link to="/Home" className="n-item">
                HOME
              </Link>
            </h2>
            <h2>
              <Link to="/Courses" className="n-item">
                COURSES
              </Link>
            </h2>
            <h2>
              <Link to="/Videos" className="n-item">
                VIDEOS
              </Link>
            </h2>

            {user.email === "Admin@gmail.com" ? (
              <>
                <h2>
                  <Link to="/addCourse" className="n-item">
                    ADD COURSE
                  </Link>
                </h2>
                <h2>
                  <Link to="/addVideo" className="n-item">
                    ADD VIDEO
                  </Link>
                </h2>
              </>
            ) : null}
            <h2>
              <Link className="n-item" onClick={handleLogout}>
                LOGOUT
              </Link>
            </h2>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Header;





