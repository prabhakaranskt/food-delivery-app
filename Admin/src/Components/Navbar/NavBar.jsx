import React from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
const NavBar = () => {
  return (
    <div className="navbar">
      <div className="header">
        <img className="logo" src={assets.logo} alt="logo" />
        <img className="profile" src={assets.profile_image} alt="profile" />
      </div>
    </div>
  );
};

export default NavBar;
