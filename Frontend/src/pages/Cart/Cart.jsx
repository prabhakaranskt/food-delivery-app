import React from "react";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import Navbar from "../../components/navBar/Navbar";

const Cart = ({ cartItems, setCartItems, subTotal, token }) => {
  const navigate = useNavigate();

  const url = "http://localhost:4000";

  const handleAddNow = () => {
    navigate("/home", { state: { scrollTo: "explore" } });
  };

  const addToCartFromCart = async (item) => {
    try {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId: item._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const res = await axios.post(
        `${url}/api/cart/fetch`,
        { userId: localStorage.getItem("userId") },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (err) {
      console.error("Inc Error", err);
    }
  };

  const removeFromCartFromCart = async (item) => {
    try {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId: item._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const res = await axios.post(
        `${url}/api/cart/fetch`,
        { userId: localStorage.getItem("userId") },
        { headers: { token } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (err) {
      console.log("Dec Error", err);
    }
  };

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await axios.post(
          `${url}/api/cart/fetch`,
          { userId: localStorage.getItem("userId") },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.success) {
          setCartItems(res.data.cartData);
        }
      } catch (error) {
        console.log("Fetch error", error);
      }
    }

    fetchCartItems();
  }, []);

  return (
    <div>
      {" "}
      <Navbar />
      <div className="cart">
        <div className="your-clear-cart">
          {" "}
          <h2 className="text-4xl">Your Cart</h2>
          {cartItems.length > 0 && (
            <button
              onClick={async () => {
                try {
                  await axios.post(
                    `${url}/api/cart/clear`,
                    {
                      userId: localStorage.getItem("userId"),
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  const res = await axios.post(
                    `${url}/api/cart/fetch`,
                    {
                      userId: localStorage.getItem("userId"),
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  if (res.data.success) {
                    setCartItems(res.data.cartData);
                  }
                } catch (err) {
                  console.log("Clear cart error", err);
                }
              }}
            >
              Clear Cart
            </button>
          )}
        </div>
        {cartItems.length === 0 ? (
          <div className="empty-cart-wrapper">
            <p className="empty-cart">
              Your Cart is Empty.Please Add some Items.
            </p>
            <button className="add-btn-on-cart" onClick={handleAddNow}>
              Add now
            </button>
          </div>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="img-td">
                      <img
                        src={
                          item.image
                            ? `${url}/images/${item.image}`
                            : assets.logoOrange
                        }
                        className="cart-img"
                      />
                    </td>
                    <td>
                      <h4>{item.name || "unnamed dish"}</h4>
                    </td>
                    <td className="price">
                      <i className="fa-solid fa-indian-rupee-sign">
                        {item.price || 0}
                      </i>
                    </td>
                    <td className="cart-counter">
                      {" "}
                      <button
                        onClick={async () => {
                          const updated = cartItems
                            .map((i) =>
                              i._id === item._id
                                ? { ...i, quantity: i.quantity - 1 }
                                : i
                            )
                            .filter((i) => i.quantity > 0);
                          setCartItems(updated);
                          await removeFromCartFromCart(item);
                        }}
                      >
                        -
                      </button>
                      {item.quantity || 0}
                      <button
                        onClick={async () => {
                          const updated = cartItems.map((i) =>
                            i._id === item._id
                              ? { ...i, quantity: i.quantity + 1 }
                              : i
                          );
                          setCartItems(updated);
                          await addToCartFromCart(item);
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td className="total">
                      {
                        <i className="fa-solid fa-indian-rupee-sign">
                          {item.price * item.quantity}
                        </i>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-details">
              <h3 className="text-2xl">Cart Totals</h3>
              <div className="subtotal">
                {" "}
                <p>SubTotal</p>
                <i className="fa-solid fa-indian-rupee-sign">{subTotal}</i>
              </div>
              <div className="delivery-fee">
                <p>Delivery Fee</p>
                <i className="fa-solid fa-indian-rupee-sign">5</i>
              </div>
              <div className="total-to">
                <p>Total</p>
                <i className="fa-solid fa-indian-rupee-sign">{subTotal + 5}</i>
              </div>
              <Link to="/order">
                <button className="checkout-btn">Proceed to Checkout</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
