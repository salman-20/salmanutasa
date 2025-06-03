import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Mystyle.css";
import { addVideo } from "../Features/AdminSlice";

const AddVideo = () => {
  const user = useSelector((state) => state.users.user.email);
  const [vidname, setVidname] = useState("");
  const [vidcourse, setVidcourse] = useState("");
  const [vidlink, setVidlink] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const videoData = {
      vidname: vidname,
      vidcourse: vidcourse,
      vidlink: vidlink,
    };

    dispatch(addVideo(videoData));
    navigate("/Videos");
  };
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    }
  }, [user]);
  return (
    <div>
      <h4 className="cor">Add Video</h4>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Video Name:</label>
            <input
              className="input2"
              type="text"
              value={vidname}
              onChange={(e) => setVidname(e.target.value)}
              placeholder="Enter video name"
              required
            />
          </div>
          <div>
            <label>Course:</label>
            <input
              className="input2"
              type="text"
              value={vidcourse}
              onChange={(e) => setVidcourse(e.target.value)}
              placeholder="Enter associated course"
              required
            />
          </div>
          <div>
            <label>Video Link:</label>
            <input
              className="input2"
              type="url"
              value={vidlink}
              onChange={(e) => setVidlink(e.target.value)}
              placeholder="Enter video link"
              required
            />
          </div>
          <div>
            <button type="submit" className="submit1">
              Add Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
