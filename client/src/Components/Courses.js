import React, { useState, useEffect } from "react";
import "./Mystyle.css";
import { useSelector, useDispatch } from "react-redux";
import { getCourses } from "../Features/AdminSlice";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.users.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.admin.courses);
  useEffect(() => {
    dispatch(getCourses());
    if (!user) {
      navigate("/Login");
    }
  }, [user]);
  return (
    <div>
      <div>
        <h4 className="cor">Courses List</h4>
      </div>
      <div style={{ display: "flex" }}>
        <input
          className="input1"
          id="searchInput"
          type="text"
          placeholder="Search Course Name"
          onChange={(s) => setSearch(s.target.value)}
        />
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="thead">
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Download Link</th>
            </tr>
          </thead>
          <tbody class="table-body">
            {courses
              .filter((c) => {
                return search.toLowerCase() === ""
                  ? c
                  : c.name.toLocaleLowerCase().includes(search);
              })
              .map((c) => (
                <tr key={c.code}>
                  <td>{c.code}</td>
                  <td>{c.name}</td>
                  <td>
                    <a href={c.link} className="submit1" target="_blank">
                      Download
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

export default Courses;
