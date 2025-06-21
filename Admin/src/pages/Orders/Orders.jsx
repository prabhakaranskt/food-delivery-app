import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../../frontend/src/assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/adminOrders`);

      if (res.data.success) {
        setOrders(res.data.data);
        toast.success("Orders fetched successfully!");
      } else {
        toast.error(res.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      toast.error(
        "Error fetching orders. Please check server and token.",
        error
      );
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put("http://localhost:4000/api/order/update-status", {
        orderId,
        status: newStatus,
      });

      fetchOrders();
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="admin-orders">
      <h2>Admin Order Management</h2>
      {Array.isArray(orders) && orders.length === 0 ? (
        <p>There is no Orders Placed</p>
      ) : (
        orders?.map((order) => (
          <div className="order-card" key={order._id}>
            <img src={assets.parcelIcon} />

            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
            <p>
              {order.address.street} {order.address.phone}
            </p>
            <p>
              <strong className="amount">Amount:</strong> {order.amount}
            </p>
            <p>
              <strong className="payment">Payment:</strong>{" "}
              {order.payment ? "Paid" : "Unpaid"}
            </p>
            <p>
              Status :
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
