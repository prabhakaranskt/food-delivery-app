import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { assets } from "../../assets/assets";
import Navbar from "../../components/navBar/Navbar";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/order/userOrders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error("error in fetching orders ", error);
      }
    };
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div>
      {" "}
      <Navbar />
      <div className="orders-page">
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p className="no-orders">No Orders Placed Yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <img src={assets.parcelIcon} />
              <div>
                <ul>
                  {order.items.map((item, index) => (
                    <li className="name-qty" key={index}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                <strong>Total :</strong> ₹{order.amount}
              </p>
              <p>
                <strong>Payment :</strong> {order.payment ? "Paid" : "Unpaid"}
              </p>
              <p className="status-dot">
                <i className="fa-regular fa-circle-dot"></i> {order.status}
              </p>

              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
