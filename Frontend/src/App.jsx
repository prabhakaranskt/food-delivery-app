import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./components/navBar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/Placeorder/PlaceOrder";
import TopDishes from "./components/TopDishes/Topdishes";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/loginAndRegister/Login";
import { Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import { ToastContainer } from "react-toastify";
import VerifyPage from "./pages/Cart/VerifyPage";

const App = () => {
  const url = "http://localhost:4000";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dishList, setDishList] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await fetch(`${url}/api/food/list`);
        const data = await res.json();
        if (data.success) {
          setDishList(data.data);
        }
      } catch (err) {
        console.log("Error fetching dishes", err);
      }
    };

    fetchDishes();
  }, []);

  const [userToken, setUserToken] = useState(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    const fetchAll = async () => {
      const userId = localStorage.getItem("userId");
      if (!userToken || !userId) return;

      try {
        const [dishesRes, cartRes] = await Promise.all([
          fetch(`${url}/api/food/list`),
          fetch(`${url}/api/cart/fetch`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
          }),
        ]);

        const dishData = await dishesRes.json();
        const cartData = await cartRes.json();

        if (dishData.success) setDishList(dishData.data);

        if (dishData.success && cartData.success) {
          const enrichedCartItems = Object.entries(cartData.cartData)
            .map(([id, quantity]) => {
              const dish = dishData.data.find(
                (d) => d._id.toString().trim() === id.toString().trim()
              );
              if (dish) return { ...dish, quantity };
              return null;
            })
            .filter(Boolean);

          setCartItems(enrichedCartItems);
        }
      } catch (err) {
        console.log("Fetch cart or dishes error:", err);
      }
    };

    fetchAll();
  }, [userToken]);

  const subTotal = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return acc + price * quantity;
      }, 0)
    : 0;
  const token = localStorage.getItem("token");

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      offset: 50,
    });
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/landingPage" />
            )
          }
        />
        <Route
          path="/home"
          element={
            <Home
              setCartItems={setCartItems}
              token={token}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/Cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              subTotal={subTotal}
              token={token}
            />
          }
        />
        <Route
          path="/order"
          element={
            <PlaceOrder
              subTotal={subTotal}
              url={url}
              token={token}
              cartItems={cartItems}
            />
          }
        />
        <Route path="/orders" element={<Orders token={token} />} />
        <Route
          path="/login"
          element={
            <Login
              setUserToken={setUserToken}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
