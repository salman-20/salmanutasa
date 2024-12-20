import "./Mystyle.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../Validations/UserValidations";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../Features/UserSlice";
import * as ENV from "../config.js";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.users.user);
  const picURL = "http://localhost:4001/uploads/" + user.profilePic;
  const [name, setName] = useState(user.name);
  const [datebirth, setDateBirth] = useState(user.datebirth);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [ips, setIp] = useState(null);
  const [geoData, setGeoData] = useState(null);

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
    }
  };

  const getGeoLocationData = async () => {
    if (!ips) return;
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country?apiKey=${ENV.API_KEY}&ipAddress=${ips}`
      );
      setGeoData(response.data);
      console.log("GeoLocation Data:", response.data);
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const handleFileChange = (event) => {
    const uploadFile = event.target.files[0];
    if (!uploadFile) {
      setProfilePic(user.profilePic);
    } else {
      setProfilePic(uploadFile);
    }
  };

  const handleUpdate = (data) => {
    const userData = {
      email: user.email,
      name: name,
      datebirth: datebirth,
      profilePic: profilePic,
    };

    dispatch(updateUserProfile(userData));
  };
  useEffect(() => {
    if (!user.email) {
      navigate("/Login");
    }
  }, [user.email]);

  useEffect(() => {
    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (ips) {
      getGeoLocationData(ips);
    }
  }, [ips]);

  return (
    <div className="register2">
      <h4 className="cor">Update Profile</h4>
      <div className="profile-container">
        <img src={picURL} className="img2" alt="Profile" />
        <div className="profile-details">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <br></br>
          {ips ? <p>IP Address: {ips}</p> : <p>Loading IP address...</p>}
          {geoData ? (
            <div>
              Country: {geoData.location.country}
              <br />
              Region: {geoData.location.region}
            </div>
          ) : (
            <p>Loading Geolocation Data...</p>
          )}
        </div>
      </div>
      <br /> <br />
      <form onSubmit={handleSubmit(handleUpdate)}>
        <label for="file-upload" class="file-upload-label">
          Choose Profile Image
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          class="file-upload-input"
          onChange={handleFileChange}
        />
        <br />
        <br />
        <input
          className="input"
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={user.email}
          disabled
          {...register("email")}
        />
        <input
          className="input"
          id="name"
          name="name"
          type="text"
          title={errors.name ? errors.name.message : ""}
          value={name}
          {...register("name")}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input
          className="input"
          id="datebirth"
          name="datebirth"
          type="date"
          value={datebirth}
          {...register("datebirth")}
          onChange={(e) => setDateBirth(e.target.value)}
        />
        {errors.datebirth && (
          <p className="error">{errors.datebirth.message}</p>
        )}

        <button className="submit1" type="submit">
          Save Changes
        </button>
      </form>
      <p className="question">
        Want to go back?{" "}
        <a href="/Home" className="linklog">
          Go to Home
        </a>
      </p>
    </div>
  );
};

export default Profile;
