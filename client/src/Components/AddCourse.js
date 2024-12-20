import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Mystyle.css";
import { addCourse } from "../Features/AdminSlice";

const AddCourse = () => {
  const user = useSelector((state) => state.users.user.email);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseData = {
      code: code,
      name: name,
      link: link,
    };
    dispatch(addCourse(courseData));
    navigate("/Courses");
  };
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    }
  }, [user]);
  return (
    <div>
      <h4 className="cor">Add Course</h4>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Course Code:</label>
            <input
              className="input2"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter course code"
              required
            />
          </div>
          <div>
            <label>Course Name:</label>
            <input
              className="input2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter course name"
              required
            />
          </div>
          <div>
            <label>Course Link:</label>
            <input
              className="input2"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter course link"
              required
            />
          </div>
          <div>
            <button type="submit" className="submit1">
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
