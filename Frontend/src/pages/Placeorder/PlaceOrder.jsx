import React, { useState } from "react";
import "./PlaceOrder.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navBar/Navbar";

const PlaceOrder = ({ cartItems, subTotal, url, token }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!data.firstName.trim()) errs.firstName = "First name is required";
    if (!data.lastName.trim()) errs.lastName = "Last name is required";
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email))
      errs.email = "Valid email required";
    if (!data.street.trim()) errs.street = "Street address required";
    if (!data.city.trim()) errs.city = "City required";
    if (!data.state.trim()) errs.state = "State required";
    if (!data.pinCode.trim() || !/^\d{6}$/.test(data.pinCode))
      errs.pinCode = "Valid 6-digit pin required";
    if (!data.country.trim()) errs.country = "Country required";
    if (!/^[6-9]\d{9}$/.test(data.phoneNumber))
      errs.phoneNumber = "Valid 10-digit phone required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fullName = `${data.firstName} ${data.lastName}`;
    const fullAddress = `${data.street}, ${data.city}, ${data.state}, ${data.pinCode}, ${data.country}`;

    try {
      const userId = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(
        `${url}/api/order/place`,
        {
          userId,
          items: cartItems,
          amount: subTotal + 5,
          address: {
            name: fullName,
            phone: data.phoneNumber,
            email: data.email,
            street: data.street,
            city: data.city,
            state: data.state,
            pinCode: data.pinCode,
            country: data.country,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success && res.data.session_url) {
        window.location.href = res.data.session_url;
      }
    } catch (err) {
      console.error("Order or payment failed", err);
    }
  };

  return (
    <div>
      {" "}
      <Navbar />
      <form onSubmit={placeOrder}>
        <div className="place-order">
          <h1 className="text-4xl font-bold ml-8">Delivery Information</h1>
          <div className="combine-wrapper">
            <div className="input-items">
              <div className="names">
                <div className="firstname">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={data.firstName}
                    name="firstName"
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="error">{errors.firstName}</p>
                  )}
                </div>

                <div className="lastname">
                  {" "}
                  <input
                    type="text"
                    onChange={handleChange}
                    value={data.lastName}
                    name="lastName"
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="error">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <input
                type="email"
                onChange={handleChange}
                value={data.email}
                name="email"
                placeholder="Email Address"
                className="email"
              />
              {errors.email && <p className="error">{errors.email}</p>}

              <input
                type="text"
                onChange={handleChange}
                value={data.street}
                name="street"
                placeholder="Street"
                className="street"
              />
              {errors.street && <p className="error">{errors.street}</p>}
              <div className="city-state">
                <div className="city">
                  {" "}
                  <input
                    type="text"
                    onChange={handleChange}
                    value={data.city}
                    name="city"
                    placeholder="City"
                  />
                  {errors.city && <p className="error">{errors.city}</p>}
                </div>
                <div className="state">
                  {" "}
                  <input
                    type="text"
                    onChange={handleChange}
                    value={data.state}
                    name="state"
                    placeholder="State"
                  />
                  {errors.state && <p className="error">{errors.state}</p>}
                </div>
              </div>

              <div className="pincode-country">
                <div className="pinCode">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={data.pinCode}
                    name="pinCode"
                    placeholder="Pin Code"
                  />
                  {errors.pinCode && <p className="error">{errors.pinCode}</p>}
                </div>

                <div className="country">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={data.country}
                    name="country"
                    placeholder="Country"
                  />
                  {errors.country && <p className="error">{errors.country}</p>}
                </div>
              </div>

              <input
                type="text"
                onChange={handleChange}
                value={data.phoneNumber}
                name="phoneNumber"
                placeholder="Phone Number"
                className="number"
              />
              {errors.phoneNumber && (
                <p className="error">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="cart-details">
              <h3 className="text-2xl ml-4">Cart Totals</h3>
              <div className="subtotal">
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
              <button className="checkout-btn" type="submit">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
