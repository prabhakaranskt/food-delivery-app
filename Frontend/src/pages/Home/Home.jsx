import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/explore-menu/ExploreMenu";
import TopDishes from "../../components/TopDishes/Topdishes";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../../components/navBar/Navbar";
import Contact from "../../components/Contact/Contact";
const Home = ({
  setCartItems,
  increment,
  count,
  decrement,
  token,
  cartItems,
}) => {
  const exploreMenuRef = useRef(null);
  const location = useLocation();

  const [category, setCategory] = useState("");
  const setData = (data) => {
    setCategory(data);
  };

  useEffect(() => {
    if (location.state?.scrollTo === "explore") {
      exploreMenuRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);
  return (
    <div>
      <Navbar />
      <Header />
      <div ref={exploreMenuRef}>
        <ExploreMenu onGotoItem={setData} />
      </div>
      <TopDishes
        category={category}
        setCartItems={setCartItems}
        count={count}
        increment={increment}
        decrement={decrement}
        token={token}
        cartItems={cartItems}
      />
      <Contact />
    </div>
  );
};

export default Home;
