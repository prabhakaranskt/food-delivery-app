import React, { useRef } from "react";
import "./ExploreMenu.css";
import { assetImages } from "../../assets/assets";

const ExploreMenu = ({ onGotoItem }) => {
  const setDataToParent = (data) => {
    onGotoItem(data);
  };
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="explore-menu-content" id="explore">
      <div className="explore-content">
        <h3>Explore the Menu</h3>
        <h6>Discover the Taste That Defines Us</h6>
        <p>
          Dive into a delicious variety of handcrafted meals made with love and
          fresh ingredients. Whether you're craving spicy street food,
          comforting classics, or healthy bites, our menu is curated to satisfy
          every mood and moment. From quick snacks to hearty dinners — explore
          and enjoy your favorites in just a few clicks.
        </p>
      </div>
      <div className="menu-items-wrapper">
        <button className="scroll-left" onClick={scrollLeft}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="X-menu-items" ref={scrollRef}>
          {assetImages.map((item) => {
            return (
              <div className="menu-items" key={item.id}>
                <img
                  onClick={() => {
                    setDataToParent(item.category);
                  }}
                  src={item.value}
                />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
        <button className="scroll-right" onClick={scrollRight}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div>
              <button className='show-all-btn' onClick={()=> setDataToParent("")}>Show All</button>

      </div>
    </div>
  );
};

export default ExploreMenu;
