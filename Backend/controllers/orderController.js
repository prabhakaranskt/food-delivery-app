import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  const { userId, items, amount, address } = req.body;
  try {
    const newOrder = new orderModel({
      userId: userId,
      items: items,
      amount: amount,
      address: address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 5 * 100,
      },
      quantity: 1,
    });
    const customer = await stripe.customers.create({
      name: address.name,
      email: address.email,
      phone: address.phone,
      address: {
        line1: address.street,
        city: address.city,
        state: address.state,
        postal_code: address.pinCode,
        country: address.country || "IN",
      },
      metadata: {
        userId: userId,
        orderId: newOrder._id.toString(),
        fullAddress: `${address.street}, ${address.city}, ${address.state}, ${address.pinCode}, ${address.country}`,
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      customer: customer.id,
      shipping_address_collection: {
        allowed_countries: ["IN"], // or ['US', 'IN', ...] if needed
      },
      metadata: { orderId: newOrder._id.toString() },

      billing_address_collection: "required", // to collect billing address
      success_url: `${frontend_url}/verify?success=true&session_id={CHECKOUT_SESSION_ID}&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in placing order",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const stripeAfterPay = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    if (orderId) {
      try {
        const currentOrder = await orderModel.findByIdAndUpdate(orderId);
        const updatedOrder = await orderModel.findByIdAndUpdate(
          orderId,
          {
            payment: true,
          },
          { new: true }
        );
        if (updatedOrder) {
          res.status(200).json({ received: true });
        } else {
          res.status(404).send("Order not found for update.");
        }
      } catch (err) {
        return res.status(500).send("Error updating order status");
      }
    } else {
      res.status(400).send("Missing orderId in session metadata.");
    }
  } else {
  }

  if (!res.headersSent) {
    res.status(200).end();
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID missing" });
    }

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
      message: "Fetched orders successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting user orders",
      error: error.message,
    });
  }
};

const getAllOrdersForAdminPanel = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: "Error in getting All Orders" });
  }
};

const updateOrderStatusInAdminPanel = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const updated = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json({ success: true, updated });
  } catch (error) {
    res.json({ success: false, message: "Error in Updating Status" });
  }
};

export {
  placeOrder,
  stripeAfterPay,
  getOrderById,
  getUserOrders,
  getAllOrdersForAdminPanel,
  updateOrderStatusInAdminPanel,
};
