import React, { useEffect } from "react";
import Home from "./Components/Home";
import Courses from "./Components/Courses";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Password from "./Components/Password";
import Registration from "./Components/Registration";
import Videos from "./Components/Videos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "./Features/UserSlice";
import { persistedStore } from "../src/Store/store.js";
import "./Components/Mystyle.css";
import Admin from "./Components/Admin";
import Header from "./Components/Header";
import Profile from "./Components/Profile";
import UpdateUser from "./Components/UpdateUser";
import AddCourse from "./Components/AddCourse";
import AddVideo from "./Components/AddVideo";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;

    // Reset timer on user activity
    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(logoutUser()); // Dispatch logout action
        persistedStore.purge(); // Purge persisted state from redux-persist
        alert("Session expired. You have been logged out due to inactivity.");
      }, 1 * 60 * 1000); // 5 minutes in milliseconds
    };

    // Add event listeners for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <div className="row">
          <div className="col-md-12"></div>
        </div>
        <Header />
        <div class Name="row">
          <div className="col-md-12 pagediv">
            <Routes>
              <Route index element={<Registration />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/Home" element={<Home />}></Route>
              <Route path="/Courses" element={<Courses />}></Route>
              <Route path="/Password" element={<Password />}></Route>
              <Route path="/Videos" element={<Videos />}></Route>
              <Route path="/Admin" element={<Admin />}></Route>
              <Route path="/Profile" element={<Profile />}></Route>
              <Route path="/updateUser" element={<UpdateUser />} />
              <Route path="/addCourse" element={<AddCourse />} />
              <Route path="/addVideo" element={<AddVideo />} />
            </Routes>
          </div>
        </div>

        <div class Name="row">
          <div className="col-md-12"></div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
