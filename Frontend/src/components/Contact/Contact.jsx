import React from "react";
import "./Contact.css";
import { assets } from "../../assets/assets";

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-img">
        <img src={assets.logoOrange} />
        <p> &copy; 2025 MealMate Limited</p>
      </div>
      <div className="company">
        <p>
          <strong>Company</strong>
        </p>
        <ul>
          <li>
            <a href="#">About Company</a>
          </li>
          <li>
            <a href="#">MealMate Corporate</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
          <li>
            <a href="#">Ream</a>
          </li>
        </ul>
      </div>
      <div className="contact-us" id="help">
        <p>
          <strong>Contact Us</strong>
        </p>
        <ul>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Partner with us</a>
          </li>
        </ul>
      </div>
      <div className="life" id="about">
        <p>
          <strong>Life at MealMate</strong>
        </p>
        <ul>
          <li>
            <a href="#">Explore with MealMate</a>
          </li>
          <li>
            <a href="#">MealMate News</a>
          </li>
          <li>
            <a href="#">Partner with us</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
