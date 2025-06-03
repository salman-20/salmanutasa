import React, { useState } from "react";
import Home from "./Components/Home";
import Courses from "./Components/Courses";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Password from "./Components/Password";
import Registration from "./Components/Registration";
import Videos from "./Components/Videos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Components/Mystyle.css";
import Admin from "./Components/Admin";
import Header from "./Components/Header";
import Profile from "./Components/Profile";
import UpdateUser from "./Components/UpdateUser";
import AddCourse from "./Components/AddCourse";
import AddVideo from "./Components/AddVideo";

function App() {
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
