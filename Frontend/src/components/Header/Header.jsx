import React from "react";
import "./Headerr.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="container">
      <div
        className="header"
        style={{ backgroundImage: `url(${assets.homeBackground})` }}
      >
        <img className="hot-dog" src={assets.hotDog} alt="Hot Dog" />
        <div className="home-quote">
          <div data-aos="fade-right">
            <h1 className="a">A</h1>
          </div>
          <div className="threes">
            <div data-aos="fade-left" data-aos-delay="300">
              <h3 className="aromatic">romatic</h3>
            </div>
            <div data-aos="fade-left" data-aos-delay="600">
              <h3 className="authentic">uthentic</h3>
            </div>
            <div data-aos="fade-left" data-aos-delay="900">
              <h3 className="always"> lways. <span className="deli-color">Delicious!</span>
              </h3>
            </div>
          </div>
          <div data-aos="fade-down" data-aos-delay="1200">
            <p className="description">
              At Meal Mate, every bite tells a story. From the rich aroma of
              freshly prepared dishes to the authentic recipes crafted by local
              chefs, we deliver flavors that feel like home — hot, hearty, and
              made with love.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="1500">
            <button className="explore-now">Explore now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
