import React, { useState, useEffect } from "react";
import "./Mystyle.css";
import { getVideos, likeVideo } from "../Features/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";

const Videos = () => {
  const user = useSelector((state) => state.users.user.email);
  const userId = useSelector((state) => state.users.user._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const videos = useSelector((state) => state.admin.videos);

  const handleLikeVideo = (videoId) => {
    const videoData = {
      videoId: videoId,
      userId: userId,
    };
    dispatch(likeVideo(videoData)).then(() => {
      dispatch(getVideos());
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/Login");
    }
  }, [user]);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);
  return (
    <div>
      <div>
        <h4 className="cor">Videos List</h4>
      </div>
      <div style={{ display: "flex" }}>
        <input
          className="input1"
          id="searchInput"
          type="text"
          placeholder="Search Video Name"
          onChange={(s) => setSearch(s.target.value)}
        />
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th style={{ width: "150px" }}>Likes & Time</th>
              <th style={{ width: "150px", textAlign: "center" }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {videos
              .filter((c) => {
                return search.toLowerCase() === ""
                  ? c
                  : c.vidname.includes(search);
              })
              .map((c) => (
                <tr key={c._id}>
                  <td>{c.vidname}</td>
                  <td>{c.vidcourse}</td>
                  <td>
                    <p> {moment(c.createdAt).fromNow()}</p>

                    <a href="#" onClick={() => handleLikeVideo(c._id)}>
                      <FaThumbsUp style={{ color: "#001d66" }} />
                      &nbsp;
                    </a>
                    {c.vidlikes.count}
                  </td>

                  <td style={{ width: "150px", textAlign: "center" }}>
                    <a href={c.vidlink} className="submit1" target="_blank">
                      Watch
                    </a>
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

export default Videos;
