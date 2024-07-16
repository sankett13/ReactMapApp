import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // You'll need to createx this CSS file
import profilePic from "../assets/profile.png";
import Logo from "../assets/Logo.jpg";

const Navbar = ({ fullName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const response = fetch("");
    navigate("/login");
  };

  const handleProfile = () => {};

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="" alt="Logo" className="logo" />
      </div>
      <div className="navbar-items">
        <div className="user-profile">
          <img
            src={profilePic}
            alt={fullName}
            className="profile-pic"
            onClick={handleProfile}
          />
        </div>
        <span className="profile-name">{fullName}</span>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
