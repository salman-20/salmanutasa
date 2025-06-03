import React, { useEffect } from "react";
import { FaYoutube, FaSnapchat, FaInstagram } from "react-icons/fa";
import "./Mystyle.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Home = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/Login");
    }
  }, [email]);

  const Admin = () => {
    navigate("/Admin");
  };
  return (
    <div>
      <div class="aboutArea">
        <h1 className="homeh1">Contact Information</h1>
        {email === "Admin@gmail.com" && (
          <button onClick={Admin} className="buttonA">
            <span>Admin Control!</span>
          </button>
        )}
        <h5>REGISTERED OFFICE</h5>

        <p className="con">
          <ul>
            <li>University of Technology and Applied Sciences AL-Musannah</li>
          </ul>
        </p>
        <h5>Contact Numbers</h5>
        <ul>
          <li>
            <p className="con">+968 79379375</p>
          </li>
          <li>
            <p className="con">+968 24112233</p>
          </li>
        </ul>
        <h5>Email</h5>
        <ul>
          <li>
            <p className="con">52J20125@utas.edu.om</p>
          </li>
        </ul>
        <h5>Follow Us</h5>
        <ul>
          <li className="con">
            <a
              className="con"
              href="https://www.instagram.com/salman_utasa/"
              target="blank"
            >
              <i>
                <FaInstagram />
              </i>
              &nbsp;Instagram
            </a>
          </li>
          <li className="con">
            <a
              className="con"
              href="https://www.snapchat.com/add/salman_utasa?share_id=p4gS7G1lfFg&locale=en-OM"
              target="blank"
            >
              <i>
                <FaSnapchat />
              </i>
              &nbsp;Snapchat
            </a>
          </li>
          <li className="con">
            <a
              className="con"
              href="https://www.youtube.com/@SALMAN_UTASA"
              target="blank"
            >
              <i>
                <FaYoutube />
              </i>
              &nbsp;YouTube
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
