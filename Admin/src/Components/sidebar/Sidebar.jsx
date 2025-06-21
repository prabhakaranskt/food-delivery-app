import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options-wrapper">
        <NavLink to="/add" className="sidebar-options">
          <img src={assets.add_icon} alt="add-items" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-options">
          <img src={assets.order_icon} alt="add-items" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-options">
          <img src={assets.order_icon} alt="add-items" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
