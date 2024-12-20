import React from "react";
import "./Mystyle.css";
import {
  FaGoogleDrive,
  FaYoutube,
  FaSnapchat,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
  
    <div className="footer-dark" >
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-6 item text">
              <h3 style={{ color: "#e3954c;" }} className="text">
                Salman Utasa Application
              </h3>
              <p className="margin">
                The Salman Utasa App helps Information Technology students by
                giving short summaries. Also, it has YouTube videos that explain
                things clearly. So, if you're studying IT, this app makes
                learning easier and more fun!.
              </p>
            </div>
            <div className="col item social">
              <a href="http://shorturl.at/buHP9" target="_blank">
                <i>
                  <FaGoogleDrive />
                </i>
              </a>
              <a href="https://www.instagram.com/salman_utasa/" target="_blank">
                <i>
                  <FaInstagram />
                </i>
              </a>
              <a
                href="https://www.snapchat.com/add/salman_utasa?share_id=p4gS7G1lfFg&locale=en-OM"
                target="_blank"
              >
                <i>
                  <FaSnapchat />
                </i>
              </a>
              <a href="https://www.youtube.com/@SALMAN_UTASA" target="_blank">
                <i>
                  <FaYoutube />
                </i>
              </a>
            </div>
          </div>
          <p className="copyright">SALMAN UTASA © 2024</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
